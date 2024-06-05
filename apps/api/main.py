from fastapi import FastAPI
from routes.chat import router as ChatRouter

app = FastAPI()

app.include_router(ChatRouter)


@app.get("/")
def home():
    return {"Hello": "World"}
