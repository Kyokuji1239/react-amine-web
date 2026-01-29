import sys
import os
sys.path.append("D:/wz/react-amine-web/Amine-Web-fastapi/")#fastapi目录

from Log import log
from Db.database import create_db_and_tables

log.LOG_DIR="D:/wz/react-amine-web/Amine-Web-fastapi/.log"#日志路径
log.init()
create_db_and_tables()

import Post.postapi