from fastapi import FastAPI
from fastapi.responses import JSONResponse
from src.middlewares.session import SessionTimeoutMiddleware, check_session_timeouts
from fastapi.middleware.cors import CORSMiddleware
from src.routes.chat import router as ChatRouter
from src.routes.heartbeat import router as HeartbeatRouter
from src.routes.web_source import router as WebSourceRouter
import asyncio
from mangum import Mangum

app = FastAPI()
handler = Mangum(app)

origins = [
    "http://localhost",
    "http://localhost:5173",
]

# Routers
app.include_router(ChatRouter)
app.include_router(HeartbeatRouter)
app.include_router(WebSourceRouter)

# Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(SessionTimeoutMiddleware)


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
