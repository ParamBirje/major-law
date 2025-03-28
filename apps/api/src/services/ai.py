from typing import List
from src.models.ai_message import UserMessageForAI
from src.services.ai_config import one_time_response
from src.models.message import Message

class AIService:

    def __init__(self):
        self.system_message = "You are a legal assistant named Majorlaw. You are here to help the user with their legal queries. If user asks unrelated questions, strictly say you can only answer legal questions. Keep your outputs short and to the point."

    def get_ai_response(self, prompt: str, chat_history: List[Message]) -> str:
        '''
        Converts `Message` objects to AI compatible and returns the AI response.
        '''
        message_list = chat_history
        ai_compatible_chat_history = [
            UserMessageForAI(
                role = "USER",
                message = self.system_message
            ).data,
            UserMessageForAI(
                role = "CHATBOT",
                message = "Okay I understand. I will behave as a legal assistant now."
            ).data,
        ]

        for i in message_list:
            temp = UserMessageForAI(
                role = i['role'],
                message = i['message']
            )
            ai_compatible_chat_history.append(temp.data)

        return one_time_response(prompt, ai_compatible_chat_history)