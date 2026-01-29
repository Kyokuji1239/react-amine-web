from pydantic import BaseModel,Field

class PostAnswerFromServer(BaseModel):
    id: str = Field(index=True,nullable=False,primary_key=True)
    title: str = Field(nullable=False)
    date: str = Field(nullable=False)
    author: str = Field(nullable=False)
    category: str = Field()
    tags: list = Field()
    summary: str = Field()
    readTime: str = Field()