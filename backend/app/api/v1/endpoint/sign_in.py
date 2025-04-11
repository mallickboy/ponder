from fastapi import APIRouter, Depends
from pydantic import BaseModel

router = APIRouter()

class signup(BaseModel):
    name: str
    email: str
    password: str


@router.post("/signup")
def signup(user: signup):
    return user