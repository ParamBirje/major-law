from fastapi import Request
from datetime import datetime
from typing import Dict
import asyncio

# Dictionary to track session activity
SESSION_ACTIVITY: Dict[str, datetime] = {}

# Timeout duration in minutes
TIMEOUT_MINUTES = 6


class SessionTimeoutMiddleware:
    async def __call__(self, request: Request, call_next):
        print("SessionTimeoutMiddleware")
        session_id = request.cookies.get("session_id")

        if session_id:
            SESSION_ACTIVITY[session_id] = datetime.now()

        response = await call_next(request)
        return response


# Periodically check for expired sessions
async def check_session_timeouts(interval: int = 60):
    while True:
        print("Checking for expired sessions...")
        now = datetime.now()
        expired_sessions = [
            session_id for session_id, last_activity in SESSION_ACTIVITY.items()
            if (now - last_activity).total_seconds() > TIMEOUT_MINUTES * 60
        ]

        for session_id in expired_sessions:
            SESSION_ACTIVITY.pop(session_id)

        await asyncio.sleep(interval)
