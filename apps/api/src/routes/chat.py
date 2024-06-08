from fastapi import APIRouter, Body, Request
from fastapi.responses import JSONResponse
from src.services.ai import AIService
from src.services.db import MessageService
from src.models.message import Message

router = APIRouter(prefix='/chat')
db = MessageService()
ai = AIService()


@router.post("/")
async def start_chatting(request: Request, prompt: str = Body(description="Latest message in the chat.", max_length=512)):
    session_id = request.headers.get('session_id')
    if not session_id:
        return JSONResponse({
            "error": "session_id is required in the request header."
        }, status_code=400)

    try:
        message_history = await db.get_messages(session_id)
        ai_message = await ai.get_ai_response(prompt, message_history)

        # saving both user and ai messages in the database
        user_message = Message(
            session_id=session_id,
            role="USER",
            message=prompt,
        )
        ai_message = Message(
            session_id=session_id,
            role="AI",
            message=ai_message,
        )
        
        await db.put_message(user_message)
        await db.put_message(ai_message)

        return JSONResponse({
            "user_message": user_message.data,
            "ai_message": ai_message.data,
        }, status_code=200)
    
    except Exception as e:
        return JSONResponse({
            "error": "Couldn't retrieve message." + str(e)
        }, status_code=500)
