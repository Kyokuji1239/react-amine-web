from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from app.models.interact import InteractionType

class InteractionBase(BaseModel):
    type: InteractionType
    content: Optional[str] = None

class InteractionCreate(InteractionBase):
    post_id: int

class InteractionInDBBase(InteractionBase):
    id: int
    user_id: int
    post_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class Interaction(InteractionInDBBase):
    pass
