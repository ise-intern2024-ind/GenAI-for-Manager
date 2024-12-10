from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import json

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class ChatRequest(BaseModel):
    input: str

@app.post("/generate_response")
async def generate_response(request: ChatRequest):

    contents = [
        {
            "parts": [
                {"text": request.input.strip()+"データ分析が欲しい、結果が日本語が欲しい。"}
            ]
        }
    ]

    GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC_r5BVTFGLI_DfMK2XG7yMO4DDNaogYk4"

    payload = {
        "contents": contents
    }

    headers = {
        "Content-Type": "application/json"
    }

    # 向 Gemini API 发送请求
    response = requests.post(GEMINI_ENDPOINT, headers=headers, data=json.dumps(payload))
    result = response.json()
    print("Full API Response:", result)  # 调试用，查看完整返回数据

    generated_text = ""

    # 从返回结构中提取文本
    candidates = result.get("candidates", [])
    if candidates:
        first_candidate = candidates[0]
        content = first_candidate.get("content", {})
        parts = content.get("parts", [])
        if parts:
            generated_text = parts[0].get("text", "")

    print("Extracted Text:", generated_text)  # 调试用，查看提取的文本

    # 将提取到的文本通过 "message" 字段返回给前端
    return {"response": generated_text}

# 运行命令测试：
# uvicorn Hugging_face:app --host 0.0.0.0 --port 5000
