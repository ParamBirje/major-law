from fastapi import FastAPI
from fastapi.responses import JSONResponse
from routes.chat import router as ChatRouter

app = FastAPI()

# Routers
app.include_router(ChatRouter)


@app.get("/")
def home():
    return JSONResponse({
        "message": "Backend is up!"
    }, status_code=200)
