from fastapi import FastAPI
from fastapi.responses import JSONResponse
from src.middlewares.session import SessionTimeoutMiddleware, check_session_timeouts
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.middleware.cors import CORSMiddleware
from src.routes.chat import router as ChatRouter
from src.routes.heartbeat import router as HeartbeatRouter
import asyncio

app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

# Routers
app.include_router(ChatRouter)
app.include_router(HeartbeatRouter)

# Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

session_middleware = SessionTimeoutMiddleware()
app.add_middleware(BaseHTTPMiddleware, dispatch=session_middleware)


@app.on_event("startup")
async def startup_event():
    '''
    Check for session timeouts every interval
    '''
    print("Starting session timeout checker.")
    asyncio.create_task(check_session_timeouts())


@app.get("/")
def home():
    '''
    Health check endpoint
    '''
    return JSONResponse({
        "message": "Backend is up!"
    }, status_code=200)
