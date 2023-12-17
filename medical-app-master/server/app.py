from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/get_question": {"origins": "http://localhost:3000"}})

@app.route('/get_question', methods=['POST'])
def get_question():
    try:
        # Get data from the request body
        request_data = request.json
        token = request_data.get('token')
        question = request_data.get('question')
        selected_image_id = request_data.get('selectedImageId')

        if not token or not question or not selected_image_id:
            return jsonify({'error': 'Invalid request data'}), 400

        # Use the token to make a GET request to the desired URL
        question_url = f"http://localhost:5000/api/questions/{selected_image_id}/questions"
        headers = {'Authorization': f'Bearer {token}'}
        response = requests.get(question_url, headers=headers)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            questions_data = response.json()
            return jsonify(questions_data), 200
        else:
            return jsonify({'error': f'Unable to fetch data. Status code: {response.status_code}'}), response.status_code

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    return response

if __name__ == '__main__':
    app.run(port=8000)
