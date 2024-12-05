from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI

roles = ["manager"]
object_name = [
    "an apple", "a ball", "a banana", "a fork", "a chick", "a knife", "a sour lemon",
    "a pear", "a spoon", "a plum", "nothing"
]

app = FastAPI()

class ChatRequest(BaseModel):
    role_num: int
    object_now: int
    object_jstnow: int = 10  # Default to 10

@app.post("/generate_response")
async def generate_response(request: ChatRequest):
    # Role-based context
    sys_context = f"I will input a number and you give me a passage".format(roles[request.role_num])
    # Previously shown object
    ast_context = f"You had been shown {object_name[request.object_jstnow]} just now"
    # User context based on current object
    user_context = "1".format(object_name[request.object_now])
    
    # OpenAI client setup
    client = OpenAI(
        base_url='http://localhost:11434/v1',
        api_key='ollama',  # required, but unused
    )
    
    # Chat completion
    response = client.chat.completions.create(
        model="llama3",
        messages=[
            {"role": "system", "content": sys_context},
            {"role": "assistant", "content": ast_context},
            {"role": "user", "content": user_context}
        ]
    )
    
    # Return response
    return {"response": response.choices[0].message.content}

# The app can be run using `uvicorn` for testing purposes:
# uvicorn filename:app --reload
