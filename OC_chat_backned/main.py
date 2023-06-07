from flask import Flask, request,jsonify
from flask_cors import CORS
from src.llama_chat import llamaChat

app = Flask(__name__)
CORS(app)

@app.route('/hello', methods=['GET'])
def hello():
    name = request.args.get('name')
    if name:
        return f"Hello, {name}!"
    else:
        return "Hello!"

@app.route('/api/chat', methods=['POST'])
def api_chat():
  data = request.json
  question = data.get('question')
  # ここで質問に対する応答の処理を行う
  chat_response = llamaChat(question)

  print(type(chat_response))
  response = {
    "result": {
      "success": chat_response,
      "error": None 
    }
  }
  return jsonify(response)
  
    
if __name__ == '__main__':
    app.run(host='localhost', port=4000)
