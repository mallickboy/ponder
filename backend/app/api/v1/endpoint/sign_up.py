from fastapi import APIRouter, Depends
from pydantic import BaseModel

router = APIRouter()

class signin(BaseModel): # type: ignore
    name: str
    email: str
    password: str


@router.post("/signin")
def signin(user: signin):
    return user