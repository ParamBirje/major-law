from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.services.scrape import scrape
from src.services.db import MessageService
from src.models.message import Message

router = APIRouter(prefix='/websource')
db = MessageService()

class Webpage(BaseModel):
    url: str

@router.post("/")
async def reference_webpage(request: Request, webpage: Webpage):
    session_id = request.headers.get('session_id')
    if not session_id:
        return JSONResponse({
            "error": "session_id is required in the request header."
        }, status_code=400)

    print(f"Session ID: {session_id}")
    print("Url received", webpage.url)

    try:
        webpage_content = scrape(webpage.url)[:180000] # only includes the first 180,000 characters (around 40,000 words)
        print("Webpage content read successfully.")

        # saving webpage content to the database
        user_message = Message(
            session_id=session_id,
            role="USER",
            message="Put this webpage content in your context for processing and answer any legal queries I have on this.\n" + webpage_content,
        )

        print("Readying webpage DB upload")
        db.put_message(user_message)
        print("DB upload ran")

        return JSONResponse({
            "message_id": user_message.data['message_id'],
        }, status_code=200)
    
    except Exception as e:
        return JSONResponse({
            "error": "Couldn't reference website. " + str(e)
        }, status_code=500)

@router.delete("/{message_id}")
async def delete_webpage(request: Request, message_id: str, created: str):
    session_id = request.headers.get('session_id')
    if not session_id:
        return JSONResponse({
            "error": "session_id is required in the request header."
        }, status_code=400)

    try:
        print("Deleting web source for message_id", message_id, "and created", created)
        db.delete_message(str(message_id), str(created))
        return JSONResponse({
            "message": "Webpage content deleted successfully."
        }, status_code=200)
    except Exception as e:
        return JSONResponse({
            "error": "Couldn't delete webpage content. " + str(e)
        }, status_code=500)