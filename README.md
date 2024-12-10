# GenAI-for-Manager(Manager GPT)

プロジェクト作者：楊 沢華、徐 遠楓、原田 諒、

## インターシップの貢献：
楊　沢華：
- 使用した開発ツールのデザイン。
- Vue.jsを使って、スーパーマーケットのデータ管理システムのフロントエンド開発した。
（ログイン、データvisualization、ManagerGPTの機能実現する、データ管理。）
- LLMの回答によって、Dashboradのデータvisualization調整。
- Fast API開発した。
- test.htmlの中でJavaScriptを使って、バックエンドにRequestとフロントエンドにResponse開発した。
- サーバでOllamaを使って、日本語のLLM　API開発した。
- LLMのプロンプトエンジニアリング(prompt engineering)


徐 遠楓：UIデザイン。

角田 大司郎：チーム間での役割分担、定期的な意見交換、資料整理。

原田 諒: test.htmlの中でHTML＋CSS静的ウェブページの開発。

共通貢献：
一緒にDesign thinking。パワーポイントの制作。

## 紹介
マネージャーGPTは、中規模のスーパーマーケットを含む流通業のマネージャーがデータ管理、分析、及び分析結果の生成を行うためのウェブベースの管理システムです。

## 開発環境
### API test
```
uvicorn Hugging_face:app --host 0.0.0.0 --port 5000
```
test.html
![test.html](/Figs/image.png)
![test.html](/Figs/image2.png)
### フロントエンド(UI/UX)
HTML＋CSS+JavaScript
**Framewrok**: vue.js, node.js
```
cd first_vue3_admin11
npm run dev
```
### 

### server
OS: Linux

### バックトエンド
- [x] FastAPI
- [x] Ollama
- [x] OpenAI
- [x] Llama-3-ELYZA-JP-8B(Llama 3 の日本語継続事前学習モデル)[https://huggingface.co/elyza/Llama-3-ELYZA-JP-8B]

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
# uvicorn LLMAPI:app --host 0.0.0.0 --port 5000


```
```
uvicorn LLMAPI:app --reload
```
### スーパーマーケットのデータ
URL:http://www.j-sosm.jp/dl/index.html


### TODO

- [ ]Prompt Engineering
