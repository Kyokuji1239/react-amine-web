from sqlmodel import SQLModel,Field,ARRAY
from typing import List
import sqlalchemy as sa

class Post(SQLModel, table=True):#帖子的数据库model
    id: str = Field(index=True,nullable=False,primary_key=True)
    title: str = Field(nullable=False)
    date: str = Field(nullable=False)
    author: str = Field(nullable=False)
    category: str = Field()
    tags: List[str] = Field(sa_column=sa.Column(ARRAY(sa.String)))
    summary: str = Field()
    readTime: str = Field()