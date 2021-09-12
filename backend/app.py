from flask import Flask, request, abort
from pymongo import MongoClient
from flask_cors import CORS
import json
from bson.json_util import ObjectId

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


mongoClient = MongoClient(host="localhost", port=27017)
db = mongoClient.names_db
names_col = db.names_col

class MyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(MyEncoder, self).default(obj)

app.json_encoder = MyEncoder

@app.route('/names', methods=['POST'])
def addname():
    name = request.form['name']
    result = names_col.insert_one({"name": name.lower()})
    inserted_name = names_col.find_one({'_id': result.inserted_id})
    return {'data': inserted_name}

@app.route('/names', methods=['DELETE'])
def deletenames():
    names_col.drop()
    return ('', 204)

@app.route('/names', methods=['GET'])
def getnames():
    names_json = []
    if names_col.find({}):
        for name in names_col.find({}).sort("name"):
            names_json.append({"name": name['name'], "id": str(name['_id'])})
    return {'data': names_json}

@app.route('/names/<id>', methods=['GET'])
def getname(id):
    name = names_col.find_one({'_id': ObjectId(id)})
    if name:
        return name
    abort(404)

@app.route('/names/<id>', methods=['DELETE'])
def deletename(id):
    names_col.delete_one( {"_id": ObjectId(id)})
    return ('', 204)

if __name__ == "__main__":
    app.run(debug=True)