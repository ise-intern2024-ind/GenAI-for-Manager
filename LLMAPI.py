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
    sys_context = f"""
    あなたはデータ分析の専門家であり、大規模な売上・業績データの分析を通じて、管理者が効果的な戦略を策定し、ビジネスの運営を最適化する手助けをすることが得意です。
    """

    ast_context = f"""
    ユーザー中村彩乃さんは、エリアマネージャーとして複数店舗を管理し、店長のサポートや運営改善を担当しています。豊富な経験を活かし、売上分析や店舗の課題解決に取り組む一方で、人材教育にも力を入れています。は中型スーパーの複数店舗の売上と業績データを分析し、各店舗の現状を把握し改善案を策定したいと考えています。現在の課題は、店舗数が多いためデータが膨大で、分析が困難であるという点です。
    """

    user_context = """
    タスク：売上・業績データの分析
    ニーズ：各店舗の売上データを分析して各店舗の状況を知りたい。
    目標：問題を明確化し、解決策を提案したい。
    課題：店舗数が多いためデータが膨大で、分析が難しい。
    """

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
    print(response)
    # Return response
    return {"response": response.choices[0].message.content}

# The app can be run using `uvicorn` for testing purposes:
#  uvicorn LLMAPI:app --host 0.0.0.0 --port 5000
