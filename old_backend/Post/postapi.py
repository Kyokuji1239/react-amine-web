from Post import postmodel

import app
from Db.Posts import crud

@app.app.get("/posts/{post_name}")
def getPost(post_name: str) -> postmodel.PostAnswerFromServer:
    return crud.readPost(post_name)
    #return postmodel.PostAnswerFromServer("a","a","a","a","a",["a"],"a","a")