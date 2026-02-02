from fastapi import APIRouter
from app.api.endpoints import auth, users, posts, upload, interact

api_router = APIRouter()
api_router.include_router(auth.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(posts.router, prefix="/posts", tags=["posts"])
api_router.include_router(interact.router, prefix="/interact", tags=["interact"])
api_router.include_router(upload.router, prefix="/upload", tags=["upload"])
