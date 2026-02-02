import shutil
import os
import time
import uuid
from typing import Any
from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from app.core.config import settings
from app.models.user import User
from app.api import deps

router = APIRouter()

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".mp3", ".wav", ".mp4"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

@router.post("/")
async def upload_file(
    file: UploadFile = File(...),
    current_user: User = Depends(deps.get_current_active_user), # 1. 限制登录
) -> Any:
    """
    上传音频或者图片文件，返回文件的访问URL
    """
    try:
        # 2. 限制后缀
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in ALLOWED_EXTENSIONS:
             raise HTTPException(status_code=400, detail=f"文件类型不允许。只支持: {ALLOWED_EXTENSIONS}")

        # 3. 限制大小 (这个需要在读取content后或者chunk读取时判断，简单方法是seek到最后看位置，或者读取content检查长度，或者Middleware处理)
        # 简单检查 content-length header 如果有
        # file.file.seek(0, 2)
        # file_size = file.file.tell()
        # file.file.seek(0)
        # if file_size > MAX_FILE_SIZE:
        #     raise HTTPException(status_code=400, detail="文件过大")
        # 由于 UploadFile 是 SpooledTemporaryFile，上面的方法可能有效。
        
        # 4. 防止同名冲突：使用 UUID + 时间戳 + 原后缀
        unique_filename = f"{uuid.uuid4().hex}_{int(time.time())}{file_ext}"
        file_location = f"{UPLOAD_DIR}/{unique_filename}"
        
        with open(file_location, "wb+") as file_object:
            # 边读边检查大小
            size = 0
            while content := await file.read(1024 * 1024): # 每次读 1MB
                size += len(content)
                if size > MAX_FILE_SIZE:
                    raise HTTPException(status_code=400, detail=f"文件过大，最大允许 {MAX_FILE_SIZE/1024/1024}MB")
                file_object.write(content)
        
        # Return URL relative to server root
        return {"url": f"/static/uploads/{unique_filename}"}
    except HTTPException:
        # 如果是我们要抛出的错误，重新抛出，且记得清理可能的垃圾文件(虽然还没写完可能不需要清理或者 open "wb+" 会截断)
        # 如果写入一半出错，应该删除垃圾文件
        if 'file_location' in locals() and os.path.exists(file_location):
            os.remove(file_location)
        raise
    except Exception as e:
        if 'file_location' in locals() and os.path.exists(file_location):
            os.remove(file_location)
        raise HTTPException(status_code=500, detail=str(e))
