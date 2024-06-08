from src.models.role import Role


class UserMessageForAI:
    def __init__(self, role: Role, message: str):
        self.data = {
            "role": role.value,
            "message": message.strip()
        }