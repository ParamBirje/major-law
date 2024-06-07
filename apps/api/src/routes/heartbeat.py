from datetime import datetime
import uuid

from fastapi.responses import JSONResponse
from src.middlewares.session import SESSION_ACTIVITY

from fastapi import APIRouter, Request

router = APIRouter(prefix="/heartbeat")


@router.get("/")
async def heartbeat(request: Request):
    session_id = request.cookies.get("session_id")
    response = JSONResponse({"status": "ok"})

    if not session_id:
        # Generate a new session ID
        session_id = str(uuid.uuid4())
        response.set_cookie(key="session_id", value=session_id)

    print(session_id)

    SESSION_ACTIVITY[session_id] = datetime.now()
    return response
