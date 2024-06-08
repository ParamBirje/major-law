import time
import uuid
from src.models.role import Role

class Message:
    def __init__(self, session_id: str, role: Role, message: str):
        self.data = {
            "message_id": uuid.uuid4().hex,
            "session_id": session_id,
            "message": message,
            "role": role.value,
            "created": int(time.time()),
            "expires": int(time.time()) + 43200 # 12 hours from now
        }