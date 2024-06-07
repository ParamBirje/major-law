from datetime import datetime
import uuid
from fastapi.responses import JSONResponse
from src.middlewares.session import SESSION_ACTIVITY
from fastapi import APIRouter, Request, Response

router = APIRouter(prefix="/heartbeat")


@router.get("/")
async def heartbeat(request: Request):
    print(request.cookies, "received.")
    session_id = request.cookies.get("session_id")
    response = JSONResponse({
        "status": "alive"
    }, status_code=200)

    if not session_id:
        # Generate a new session ID
        print("Generating new session ID.")
        session_id = str(uuid.uuid4())
        response.set_cookie(key="session_id", value=session_id, secure=True, samesite='None')

    print(session_id, "updated.")

    SESSION_ACTIVITY[session_id] = datetime.now()
    return response
