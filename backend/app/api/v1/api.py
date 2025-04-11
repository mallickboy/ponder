from fastapi import APIRouter
from app.api.v1.endpoint import sign_up, sign_in, ai_bot, user_db

api_router = APIRouter()

api_router.include_router(sign_up.router, prefix="/auth", tags=["Auth"]) # entending paths of endpoint
api_router.include_router(sign_in.router, prefix="/auth", tags=["Auth"]) # entending paths of endpoint
api_router.include_router(ai_bot.router, prefix="/bot", tags=["ChatBot"]) # entending paths of endpoint
api_router.include_router(ai_bot.router, prefix="/bot", tags=["ProjectUpdate"]) # entending paths of endpoint
api_router.include_router(user_db.router, prefix="/user", tags=["UserDB"]) # entending paths of endpoint