# In your FastAPI app
from fastapi import APIRouter, HTTPException, Depends, Header, status
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv
import requests
from typing import Optional
from jose import jwt, JWTError,jwk

# Load environment variables
load_dotenv()

# Database connection parameters
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
CLERK_API_KEY = os.getenv("CLERK_API_KEY")
CLERK_JWT_PUBLIC_KEY = os.getenv("CLERK_JWT_PUBLIC_KEY")

router = APIRouter()

# Pydantic models
class UserProfileInput(BaseModel):
    user_id: str
    user_name: str
    session_token: str  # Clerk session token

class ProjectUpdate(BaseModel):
    user_id: str
    project_data: dict
    session_token: str  # Clerk session token

db_connection= None

# Helper function to get database connection
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            cursor_factory=RealDictCursor
        )
        return conn
    except Exception as e:
        raise e 

def global_db_connection_start():
    global db_connection
    try:
        if db_connection is None:
            db_connection = get_db_connection()
            print("\n******Connected with Database successfully!******\n")
    except Exception as e:
        print(f"\n******Error connecting to database:******\n{e}")
        raise e 

def global_db_connection_close():
    global db_connection
    try:
        if db_connection is not None:
            db_connection.close()
            db_connection = None
            print("\n******Dis-connected from Database successfully!******\n")
    except:
        print("\n******Unable to close connection with the Database!******\n")

## Now Clerk
def get_clerk_public_key(kid: str):
    jwks = requests.get(CLERK_JWT_PUBLIC_KEY).json()
    for key in jwks["keys"]:
        if key["kid"] == kid:
            return key
    raise Exception("Public key not found.")

def verify_clerk_token(token: str):
    try:
        unverified_header = jwt.get_unverified_header(token)
        key_data = get_clerk_public_key(unverified_header["kid"])
        # Build public key
        public_key = jwk.construct(key_data)
        # Decode token
        payload = jwt.decode(
            token,
            public_key,
            algorithms=[key_data["alg"]],
            options={"verify_aud": False},  # disable audience validation for simplicity
        )
        return payload
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Clerk session token"
        )
# Function to verify Clerk session token
def verify_clerk_session(session_token: str, claimed_user_id: str):
    try:
        payload=verify_clerk_token(session_token)
        # print(payload, claimed_user_id)
        session_user_id = payload.get("sub")

        # Check if claimed user_id matches the session's user_id
        print("####Clerk Session Verified")
        return session_user_id == claimed_user_id
    except Exception as e:
        print(f"Error verifying Clerk session: {e}")
        return False

# Dependency to verify user authentication
async def verify_auth(user_id: str = Header(...), session_token: str = Header(...)):
    is_valid = verify_clerk_session(session_token, user_id)
    if not is_valid:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return user_id

@router.post("/profile")
def get_or_create_user_profile(user_data: UserProfileInput): 
    # Verify the user's session token
    # print(user_data.user_name)
    if not verify_clerk_session(user_data.session_token, user_data.user_id):
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Check if user exists
        cursor.execute(
            "SELECT * FROM users WHERE user_id = %s", 
            (user_data.user_id,)
        )
        user = cursor.fetchone()
        
        if user is None:
            # Create new user with default values
            print(f"Creating new user profile for {user_data.user_name} ({user_data.user_id})")
            cursor.execute(
                """
                INSERT INTO users (user_id, user_name, gems, points, level, project_json_object)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING *
                """,
                (
                    user_data.user_id,
                    user_data.user_name,
                    10,  # Default gems
                    100,    # Default points
                    1,    # Default level
                    '[{}]'  # Empty project JSON
                )
            )
            user = cursor.fetchone()
            conn.commit()
        else:
            print(f"Found existing user: {user['user_name']} ({user['user_id']})")
        
        return {"success": True, "profile": user}
    
    except Exception as e:
        conn.rollback()
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
    finally:
        cursor.close()
        conn.close()

@router.put("/project-update")
def update_user_project(project_update: ProjectUpdate):
    # Verify the user's session token
    if not verify_clerk_session(project_update.session_token, project_update.user_id):
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Check if user exists
        cursor.execute(
            "SELECT project_json_object FROM users WHERE user_id = %s", 
            (project_update.user_id,)
        )
        user = cursor.fetchone()
        
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Update project data
        cursor.execute(
            """
            UPDATE users 
            SET project_json_object = %s 
            WHERE user_id = %s
            RETURNING *
            """,
            (project_update.project_data, project_update.user_id)
        )
        updated_user = cursor.fetchone()
        conn.commit()
        
        return {"success": True, "profile": updated_user}
    
    except Exception as e:
        conn.rollback()
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
    finally:
        cursor.close()
        conn.close()

# Alternative approach: Using dependency injection for endpoints
# This is a more FastAPI-idiomatic way to handle auth
@router.get("/profile-secure")
def get_user_profile(user_id: str = Depends(verify_auth)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT * FROM users WHERE user_id = %s", (user_id,))
        user = cursor.fetchone()
        
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {"success": True, "profile": user}
    
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
    finally:
        cursor.close()
        conn.close()