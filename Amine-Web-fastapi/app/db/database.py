from sqlmodel import SQLModel, create_engine, Session # 引入Session和create_engine
from app.core.config import settings

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI)) # 连接数据库

def init_db(): # 自动创建表
    SQLModel.metadata.create_all(engine)

def get_db(): # 数据库会话生成器
    with Session(engine) as session:
        yield session
    # 当收到请求，创建一个新的数据库会话，并在请求结束后关闭会话
