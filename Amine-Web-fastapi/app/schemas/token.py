from typing import Optional
from pydantic import BaseModel

# 返回给前端的Token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
