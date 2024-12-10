# GenAI-for-Manager(Manager GPT)

プロジェクト作者：楊 沢華、徐 遠楓、角田 大司郎、原田 諒

github:https://github.com/ise-intern2024-ind/GenAI-for-Manager

## チームワークへの貢献：
楊　沢華：

- ~~Vue.jsを使って、スーパーマーケットのデータ管理システムのフロントエンド開発した。~~
~~（ログインとログアウト、データvisualization、ManagerGPTの機能実現する、データ管理。）~~
- ~~LLMの回答によって、Dashboradのデータvisualization調整。~~
- 
（システムに関する内容がチームメンバーに対する難しすぎたため、開発は行ったものの、チームが理解するのが困難でした。最終の発表には、ManagerGPTの対話機能のみを使用しました。）

以下は発表の内容への貢献：
- 開発に使用したツールの選定および設計。
- FastAPIを使用したバックエンドシステムの設計と開発。
- test.htmlの中でJavaScriptを使って、バックエンドにRequestとフロントエンドにResponseの開発。
- サーバでOllamaを活用し、日本語対応のLLM APIを開発。
- LLMのプロンプト設計および最適化 (Prompt Engineering)。
- 入力データの収集およびデータモデリングの実施。
- チームの共同作業のため、GitHubリポジトリを用いた開発環境の構築。githubのRepositories）
- プレゼンテーション資料（PowerPoint）およびソースコードの整理とアップロード。
- README.mdの作成。

徐 遠楓：
- UI、UXデザイン。
- フロントエンドとDashboradのデザイン
- 一部分のフロントエンドの開発

角田 大司郎：チーム間での役割分担、定期的な意見交換。

原田 諒: test.htmlの中でHTML＋CSS静的ウェブページの開発。

共通貢献：
一緒にDesign thinking。パワーポイントの制作。

## 紹介
マネージャーGPTは、中規模のスーパーマーケットを含む流通業のマネージャーがデータ管理、分析、及び分析結果の生成を行うためのウェブベースの管理システムです。

以下のビデオは開発の展示です。

https://private-user-images.githubusercontent.com/149043966/394314820-671292c2-1328-46f3-8df8-c34e487ffa1e.mp4

## 開発環境
![](/Figs/image3.png)

### API test

まずは、Terminalに以下の内容を入力。
```python
uvicorn Hugging_face:app --host 0.0.0.0 --port 5000 #Ollama環境がない場合。
uvicorn LLMAPI:app --host 0.0.0.0 --port 5000　#Ollama環境がある場合。
```
ブラウザで test.html を開く。test.html（Fast APIのテスト，HTML+CSS+Javascript）
![](/Figs/image.png){width=400}![](/Figs/image2.png){width=300}

### フロントエンド(UI/UX)
HTML＋CSS+JavaScript
**Framewrok**: vue.js
```
cd first_vue3_admin11
npm run dev
```
**ログインとログアウト**
![ログインと](/Figs/image4.png)
**Dashborad**
![Dashborad](/Figs/image6.png)
**ManagerGPT**
![ManagerGPT](/Figs/image7.png)

### バックトエンド
- [x] FastAPI
- [x] [Ollama](https://ollama.com/)
- [x] OpenAI
- [x] [Llama-3-ELYZA-JP-8B(Llama 3 の日本語継続事前学習モデル)](https://huggingface.co/elyza/Llama-3-ELYZA-JP-8B)
- [x] Gemini(Ollama環境がない場合は、Hugging_face.pyを使っています。)

バックエンドのAPIについて：
LLMAPI.pyは、自分のPCやサーバーでOllamaを利用し、LLMであるLlama-3-ELYZA-JP-8Bをデプロイして使用することができます。
GUIが利用できない環境では、Hugging_face.pyを使用してください。このプログラムはGeminiのAPIを利用しており、自分のPC環境を必要としません。
Terminalに以下の内容を入力。
```python
uvicorn Hugging_face:app --host 0.0.0.0 --port 5000 #Ollama環境がない場合。
uvicorn LLMAPI:app --host 0.0.0.0 --port 5000　#Ollama環境がある場合。
```


### スーパーマーケットのデータ
URL:http://www.j-sosm.jp/dl/index.html


### TODO

- [x]　パワーポイントとソースコード整理とアップロード
