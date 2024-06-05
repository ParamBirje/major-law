from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse

router = APIRouter(prefix='/chat')


@router.post("/")
async def start_chatting(prompt: str = Body(description="Latest message in the chat.", max_length=1024)):
    return JSONResponse({
        "chain": [
            {
                "role": "ai",
                "message": "Hello, what can I do for you?"
            }
        ]
    }, status_code=200)
