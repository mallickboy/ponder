from fastapi import APIRouter, Depends
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import random

## Idea 

router = APIRouter()

class ChatInput(BaseModel):
    chat: str

class UserAuth(BaseModel):
    user_id: str
    user_password: str

count= 0
def project(count):
    return[
    {
      "title": f"Problem & Idea Validation ( {count} times updated by server)",
      "weekRange": "1-2",
      "coreQuestions": [
        "How many people would buy a mask-shaped microphone?",
        "How often do people need to keep their call inaudible to others?",
        "What existing solutions do people use for privacy in public calls?"
      ],
      "steps": [
        "Talk to people in places like libraries or cafes to understand their privacy concerns.",
        "Run an online survey to see how common this issue is.",
        "Collect feedback about the mask microphone idea.",
        "Analyze competitors and alternative solutions"
      ]
    },
    {
      "title": "Customer Discovery & Concept Development",
      "weekRange": "3-6",
      "coreQuestions": [
        "Who would benefit most from a privacy-focused mask microphone?",
        "What features are absolutely essential?",
        "What marketing channels performs the best?"
      ],
      "steps": [
        "Create customer personas that represent your target audience, like students or remote workers.",
        "Reach out to target audience and dive deeper into audience's need.",
        "Analyze results to understand customer pain points better.",
        "Research similar products and learn their pro and con.",
        "Design a landing page and build a waitlist."
      ]
    },
    {
      "title": "Business Strategy Development",
      "weekRange": "7-8",
      "coreQuestions": [
        "What is the go-to-market strategy?",
        "What pricing model works best for this product?",
        "How to scale manufacturing and distribution?"
      ],
      "steps": [
        "Define your business model",
        "Create financial projections",
        "Develop marketing strategy"
      ]
    },
    {
      "title": "MVP Development",
      "weekRange": "9-12",
      "coreQuestions": [
        "What is the minimum viable product?",
        "How can we test the product with real users?"
      ],
      "steps": [
        "Design basic prototype",
        "Test with small user group",
        "Iterate based on feedback",
        "Prepare for initial production run"
      ]
    }
  ]

@router.post("/chatbot")
def chatbot(message: ChatInput):
    # response = {"message": "Got " + message.chat}
    update_proj = random.randint(0, 10) > 5 
    reply= "Got " + message.chat
    if update_proj:
        response = {"reply": reply, "projectUpdates": True}
    else:
        response = {"reply": reply, "projectUpdates": False}
        
    return JSONResponse(content=response)

    

@router.get("/projectupdate")
def project_update():
    global count
    count = count+ 1
    return project(count= count)

@router.post("/getproject")
def get_project(user: UserAuth):
    if user.user_id and user.user_password:
        return project(count= 1)
    else:
        return [
    {
      "title": f"Only Autorized Users can Fetch their Project data",
      "weekRange": "",
      "coreQuestions": [ ],
      "steps": [ ]
    }
  ]