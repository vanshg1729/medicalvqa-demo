from flask import Flask, request,Response, make_response,jsonify
from flask_cors import CORS,cross_origin
from pymongo import MongoClient
from bson.objectid import ObjectId
import bson
from PIL import Image
# import gridfs
from gridfs import GridFS
import base64

    

app = Flask(__name__)
CORS(app) # allow CORS for all routes


client = MongoClient('mongodb://localhost:27017/')
db = client['mymedicaldb']
collection = db['vqarad']




@app.route('/menu',methods=['GET'])
@cross_origin()
def get_menu():
    collection = db['vqarad']
    menu_items = []
    for file in collection.find():
        menu_items.append({'value': file['image_name'],'label': file['image_name']})
    return jsonify(menu_items)



@app.route('/autocomplete',methods=['GET'])
@cross_origin()
def get_autocomplete():
    collection = db['vqarad']
    questions = []
    for file in collection.find():
        questions.append(file['preproc_questions'])
    questions = [q for ques_list in questions for q in ques_list]
    
    response = {'questions' : questions}
    
    return jsonify(response)



@app.route('/getanswer',methods=['GET'])
@cross_origin()
def get_answer():
    query = request.args.get('query')
    image = request.args.get('image')
    
    print("Query is ------")
    print(query)
    
    result = collection.find_one({'image_name': image})
    if result:
        questions = result['preproc_questions']
        answers = result['answers']
        text_response = answers[0]
#         for i,q in enumerate(questions):
#             if(q == query):
#                 text_response = answers[i]
        
#         text_response = answers[0]
        
    else:
        text_response = "No data"

    return jsonify({
        'answer': text_response,
    })


@app.route('/loadimage',methods=['GET'])
@cross_origin()
def load_image():
    image = request.args.get('image')
    
    result = collection.find_one({'image_name': image})
    if result:
        image_data = result['image']
        questions = result['questions']
        answers = result['answers']
        encoded_image = base64.b64encode(image_data).decode('utf-8')
    else:
        encoded_image = None
        questions = None
        answers = None

    return jsonify({
        'image': encoded_image,
        'questions' : questions,
        'answers' : answers
    })


    




    
    

