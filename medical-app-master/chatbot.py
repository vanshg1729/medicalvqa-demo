import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import os

app = Flask(__name__)
CORS(app)

def load_data(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def find_best_match(user_question, questions):
    best_match = process.extractOne(user_question, questions, scorer=fuzz.ratio)
    return best_match[0] if best_match else None

def get_answer(user_question, selected_image, data):
    for image_data in data['images']:
        if image_data['image'] == selected_image:
            questions = [item['question'] for item in image_data['questions']]
            best_match = find_best_match(user_question, questions)
            if best_match:
                for item in image_data['questions']:
                    if item['question'] == best_match:
                        return item['answer']

    return "Please select and image first"

@app.route('/api/answer', methods=['POST'])
def answer_question():
    user_question = request.json.get('question')
    selected_image = request.json.get('selectedImage')
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, 'src', 'components', 'data.json')
    data = load_data(file_path)
    print(selected_image, "selected_image")
    answer = get_answer(user_question, selected_image, data)
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
