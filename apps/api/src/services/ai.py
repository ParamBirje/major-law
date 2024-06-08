from src.models.role import Role
from src.models.ai_message import UserMessageForAI
from src.services.ai_config import one_time_response
from src.models.message import Message

class AIService:
    def get_ai_response(self, prompt: str, chat_history: Message) -> str:
        '''
        Converts `Message` objects to AI compatible and returns the AI response.
        '''
        message_list: list = chat_history.data
        ai_compatible_chat_history = []

        for i in message_list:
            temp = UserMessageForAI(
                role = i['role'],
                message = i['message']
            )
            ai_compatible_chat_history.append(temp.data)

        return one_time_response(prompt, ai_compatible_chat_history)