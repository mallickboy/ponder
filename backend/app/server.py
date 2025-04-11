from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router
from app.api.v1.endpoint.user_db import global_db_connection_start, global_db_connection_close

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

## Start up & Shhut Down
@app.on_event("startup")
async def startup():
    print("******Start Up******")
    global_db_connection_start()

@app.on_event("shutdown")
async def shutdown():
    print("******Shut Down******")
    global_db_connection_close()

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Welcome to OTPify API"}

