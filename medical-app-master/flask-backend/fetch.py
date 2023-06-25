from flask import Flask, request,Response, make_response,jsonify
from flask_cors import CORS,cross_origin
from pymongo import MongoClient
from bson.objectid import ObjectId
import bson
from PIL import Image
# import gridfs
from gridfs import GridFS
import base64


db_config = dict({

    'server' : 'mongodb://localhost:27017/',
    'db' : 'mymedicaldb',
    'deepeyenet' : 'deepeyetest',
    'vqarad' : 'vqarad',
})
    

app = Flask(__name__)
CORS(app) # allow CORS for all routes
client = MongoClient('mongodb://localhost:27017/')
collection = []
db = client['mymedicaldb']
deepeyenet_collection = db['deepeyetest']
vqarad_collection = db['deepeyetest']
fs = GridFS(db, collection="deepeyetest")

@app.route('/fetch-data', methods=['GET'])
@cross_origin()
def fetch_data():
    # Fetch text data
    query = request.args.get('query')
    print(query)
    results = collection.find({ "$text": { "$search": query }},{ "score": { "$meta": "textScore" } }).sort([("score", {"$meta": "textScore"})])
    data = []
    image_data = None
    obj_id = None
    for result in results:
        data.append({
            'caption': result['caption']
        })
#         image_result = collection.find_one({'file_id': result['file_id']})
#         image_data = image_result['image']

    # Create response object with both text and image data
    response = make_response({'data': data})
#     response.headers.set('Content-Type', 'image/jpeg')
#     response.set_data(image_data)
    return response



# grid_out = gridfs.get(gridfs_id)
# image_data = grid_out.read()

# image = Image.open(io.BytesIO(image_data))
# image.show()



@app.route('/search',methods=['GET'])
@cross_origin()
def search():
    query = request.args.get('q')
    # Search for the query in MongoDB and retrieve the image and text
#     result = collection.find_one({'query': query})

#     results = collection.find({ "$text": { "$search": query }},{ "score": { "$meta": "textScore" } }).sort([("score", {"$meta": "textScore"})])
    
#     # count the total number of documents in the Cursor
#     total_documents = results.count_documents({})

#     # print the total number of documents
#     print(f"Total documents: {total_documents}")
    
#     result = results[0]
    result = collection.find_one({'$text': {'$search': query}})
    print(result)
    if result:
        gridfs_id = result['gridfs_id']
#         gridfs_id = ObjectId(result['gridfs_id'])
        grid_out = fs.get(gridfs_id)
        image_data = grid_out.read()
        text_response = result['caption']
        encoded_image = base64.b64encode(image_data).decode('utf-8')
    else:
        encoded_image = None
        text_response = "No data"
    # Return the image and text response
#     if image_data:
#         response = make_response({'data': data})
#         response.headers.set('Content-Type', 'image/jpeg')
#         response.set_data(image_data)
#     else:
#         response = make_response({'data': data})
#         return response

    return jsonify({
        'image': encoded_image,
        'caption': text_response,
    })


# @app.route('/menu')
# @cross_origin()
# def get_menu():
#     menu_items = [{'value': 'Yash', 'label': 'Khare'},
#                   {'value': 'Sajan', 'label': 'Singh'},
#                   {'value': 'option3', 'label': 'Option 3'}]
#     return jsonify(menu_items)

@app.route('/menu')
@cross_origin()
def get_menu():
    collection = db['vqarad']
    menu_items = []
    for file in collection.find():
        menu_items.append({'value': file['_id'],'label': file['image_name']})
    return jsonify(menu_items)




# def fetch_data():
#     query = request.args.get('query')
#     print(query)
# #     results = collection.find({'field': query})
#     results = collection.find({ "$text": { "$search": query }},{ "score": { "$meta": "textScore" } }).sort([("score", {"$meta": "textScore"})])
#     data = []
#     for result in results:
#         obj_id = result['_id']
#         result_image = collection.find_one({'_id': obj_id})
#         image_data = result['image']
#         break
# #         data.append({
# #             'caption': result['caption'],
# # #             'field2': result['field2']
# #             # add additional fields as needed
# #         })
# #     return {'data': data}
#     return Response(image_data, mimetype='image/jpeg')


if __name__ == '__main__':
    app.run(debug=True)
    




    
    

