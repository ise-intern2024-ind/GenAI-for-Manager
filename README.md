# GenAI-for-Manager(Manager GPT)
## 紹介

## 開発環境

### フロントエンド(UI/UX)
HTML＋CSS+JavaScript
**Framewrok**: vue.js, node.js
```
cd first_vue3_admin11
npm run dev
```


### server
OS: Linux

### バックトエンド
- [x] FastAPI
- [x] Ollama
- [https://huggingface.co/elyza/Llama-3-ELYZA-JP-8B] Llama-3-ELYZA-JP-8B(Llama 3 の日本語継続事前学習モデル)
- [ ]


```python
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# class ChatRequest(BaseModel):
#     role_num: int
#     object_now: int
#     object_jstnow: int = 10  # Default to 10

class ChatRequest(BaseModel):
    input: str


@app.post("/generate_response")
async def generate_response(request: ChatRequest):
    # Role-based context
    sys_context = f"ユーザーはマネージャーです、データ分析が欲しい"
    # Previously shown object
    ast_context = f"データ分析の機能、入力はスーパーマーケットのデータ"
    # User context based on current object
    user_context = ""
    
    # OpenAI client setup
    client = OpenAI(
        base_url='http://localhost:11434/v1',
        api_key='ollama',  # required, but unused
    )
    
    # Chat completion
    response = client.chat.completions.create(
        model="elyza:jp8b",
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


```
```
uvicorn LLMAPI:app --reload
```
### スーパーマーケットのデータ
URL:http://www.j-sosm.jp/dl/index.html

### サーバー
OS: Linux

### TODO

- [ ]Prompt Engineering
