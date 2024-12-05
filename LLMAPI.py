from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
import requests

# 创建 FastAPI 实例
app = FastAPI()

# 定义请求体的数据模型
class Llama3Request(BaseModel):
    prompt: str
    max_tokens: int = 100
    temperature: float = 0.7

# 定义调用 Ollama3 的函数
OLLAMA3_API_URL = "http://localhost:11434/api/generate"

def call_ollama3(prompt: str, max_tokens: int, temperature: float) -> Union[str, None]:
    try:
        response = requests.post(
            OLLAMA3_API_URL,
            json={"model": "llama3", "prompt": prompt, "max_tokens": max_tokens, "temperature": temperature}
        )
        if response.status_code == 200:
            return response.json() if response.headers.get('Content-Type') == 'application/json' else None
        else:
            return None
    except requests.RequestException as e:
        print(f"Error occurred while calling Ollama3 API: {e}")
        return None

# 定义接口根路径
@app.get("/")
def read_root():
    return {"message": "Welcome to the Llama3 API powered by FastAPI!"}

# 定义接口调用 Llama3 模型
@app.post("/generate")
def generate_text(request: Llama3Request):
    
    result = call_ollama3(request.prompt, request.max_tokens, request.temperature)
    if result and isinstance(result, dict) and 'text' in result: return {"generated_text": result['text']}
    else:
        return {"error": "Failed to generate text"}

# 示例接口：返回传入的 item_id
@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
