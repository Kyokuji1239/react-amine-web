from typing import Any, List
from fastapi import APIRouter, Depends
from sqlmodel import Session

from app import crud
from app.crud import crud_interact
from app.api import deps
from app.models.user import User
from app.schemas.interact import Interaction, InteractionCreate

router = APIRouter()

@router.post("/", response_model=Interaction)
def create_interaction(
    *,
    db: Session = Depends(deps.get_db),
    interaction_in: InteractionCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create an interaction (like/comment) on a post.
    """
    interaction = crud_interact.create(db, obj_in=interaction_in, user_id=current_user.id)
    return interaction

@router.get("/user/me", response_model=List[Interaction])
def read_my_interactions(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Get current user's interactions.
    """
    interactions = crud_interact.get_by_user(db, user_id=current_user.id, skip=skip, limit=limit)
    return interactions

@router.get("/post/{post_id}", response_model=List[Interaction])
def read_post_interactions(
    post_id: int,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Get interactions for a post.
    """
    interactions = crud_interact.get_by_post(db, post_id=post_id, skip=skip, limit=limit)
    return interactions
