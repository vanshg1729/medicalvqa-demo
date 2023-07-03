import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from fuzzywuzzy import fuzz
from fuzzywuzzy import process

app = Flask(__name__)
CORS(app)


def load_data(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def find_best_match(user_question, questions):
    best_match = process.extractOne(user_question, questions, scorer=fuzz.ratio)
    return best_match[0] if best_match else None

def get_answer(user_question, data):
    questions = [item['question'] for item in data['questions']]
    best_match = find_best_match(user_question, questions)
    
    if best_match:
        for item in data['questions']:
            if item['question'] == best_match:
                return item['answer']
    
    return "I'm sorry, I don't have an answer to that question."

@app.route('/api/answer', methods=['POST'])
def answer_question():
    user_question = request.json.get('question')
    data = load_data('src/components/data-chatbot.json')
    answer = get_answer(user_question, data)
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
