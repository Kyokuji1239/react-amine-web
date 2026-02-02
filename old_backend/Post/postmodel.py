from pydantic import BaseModel,Field
#from sqlmodel import ARRAY
from typing import List
#from sqlalchemy import sa

class PostAnswerFromServer(BaseModel):
    id: str = Field(index=True,nullable=False,primary_key=True)
    title: str = Field(nullable=False)
    date: str = Field(nullable=False)
    author: str = Field(nullable=False)
    category: str = Field()
    tags: List[str] = Field()#tags: List[str] = Field(sa_column=sa.Column(ARRAY(sa.String)))
    summary: str = Field()
    readTime: str = Field()
