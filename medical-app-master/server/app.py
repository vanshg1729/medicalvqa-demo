from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import spacy


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the spaCy English model
nlp = spacy.load("en_core_web_md")  # or "en_core_web_lg"

def find_closest_question(question_text, existing_questions):
    # Use spaCy to get the similarity between the input question and each existing question
    similarities = [(nlp(question_text).similarity(nlp(q['questionText'] + q['answerText'])), q) for q in existing_questions]

    # Sort by similarity in descending order
    similarities.sort(key=lambda x: x[0], reverse=True)

    # Return the most similar question and its corresponding answer
    return similarities[0][1]

@app.route('/get_question', methods=['POST'])
def get_question():
    try:
        # Get data from the request body
        request_data = request.json
        token = request_data.get('token')
        question = request_data.get('question')
        selected_image_id = request_data.get('selectedImageId')

        if not token or not selected_image_id:
            return jsonify({'error': 'Invalid request data. Token and selectedImageId are required.'}), 400
        # print(question, selected_image_id)
        if not question or question == 'Please Add a Question':
            # Return a 201 status with the answerText as "Please enter a valid question"
            return jsonify({'closest_question': {'answerText': 'Please enter a valid question'}}), 201

        # Use the token to make a GET request to the desired URL
        url = f"http://localhost:5000/api/image/{selected_image_id}/questions"
        print(url, "url")
        print(selected_image_id, "hi")
        # now we have to make a get request to the url
        # print(url)
        response = requests.get(url, headers={'Authorization': f'Bearer {token}'})
        print(response, "hi")

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            questions_data = response.json()
            
            # Find the closest question and its corresponding answer
            closest_question = find_closest_question(question, questions_data['questions'])

            # Return the closest question and answer
            return jsonify({'closest_question': closest_question}), 200
        else:
            return jsonify({'error': f'Unable to fetch data. Status code: {response.status_code}'}), response.status_code

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/get_tags', methods=['POST'])
def get_tags():
    # we get the 3 topmost similar tags in the backend, and then find and show all the images that are tagged with those tags in the frontend
    try:
        # Get data from the request body
        request_data = request.json
        token = request_data.get('token')
        input_tag = request_data.get('input_tag')
        all_tags = request_data.get('all_tags')
        selected_image_id = request_data.get('selectedImageId')

        if not token or not selected_image_id:
            return jsonify({'error': 'Invalid request data. Token and selectedImageId are required.'}), 400
        
        # we find the 3 topmost similar tags to input_tag from all_tags
        # we use spaCy to get the similarity between the input tag and each existing tag
        similarities = [(nlp(input_tag).similarity(nlp(tag)), tag) for tag in all_tags]
        # Sort by similarity in descending order
        similarities.sort(key=lambda x: x[0], reverse=True)
        # Return the most similar tags
        top_tags = [tag for (similarity, tag) in similarities[:3]]
        print(top_tags)
        
        return jsonify({'top_tags': top_tags}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(port=8000)
