from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo = PyMongo(app)
products = mongo.db.products
currencies = mongo.db.currencies

@app.route("/add_product", methods=['POST'])
def add_product():
    product_data = request.json
    if ("name" in product_data) and ("stock" in product_data) and ("cost" in product_data) and ("price" in product_data):
        products.insert_one({
            "name": product_data["name"],
            "stock": product_data["stock"],
            "cost": product_data["cost"],
            "price": product_data["price"],
            "created_at": datetime.utcnow(),
            "img": product_data["img"] if "img" in product_data else None,
            "features": product_data["features"] if ("features" in product_data) else [],
        })
        return jsonify({'message': 'product added successfully'}), 201
    
    return jsonify({'message': 'missing product data'})

@app.route("/get_product/<product_id>", methods=['GET'])
def get_product(product_id):
    product_data = products.find_one({"_id": ObjectId(product_id)})
    final_product = {
        "_id": str(product_data['_id']),
        "name": product_data["name"],
        "stock": product_data["stock"],
        "cost": product_data["cost"],
        "price": product_data["price"],
        "img": product_data["img"],
        "features": product_data["features"]
        }
    return jsonify(final_product)


    
@app.route("/add_currency", methods = ["POST"])
def add_currency():
    currency_data = request.json
    currencies.insert_one({
        "name": currency_data["name"],
        "value_in_eur": currency_data["value_in_eur"],
        "symbol": currency_data["symbol"],
        "abbreviation": currency_data["abbreviation"],
    })
    return jsonify({"message": "currency added correctly"})

@app.route("/delete_currency/<currency_name>", methods=["DELETE"])
def delete_currency(currency_name):
    currencies.delete_many({"name":currency_name})
    return jsonify({"message": f"{currency_name} deleted successfully"})

@app.route("/delete_product", methods=["DELETE"])
def delete_product():
    products.delete_many({})
    return jsonify({"message": "products removed"})

@app.route("/get_all_products", methods=["GET"])
def get_all_products():
    all_products = products.find({})
    all_products = [
        {'_id':str(product['_id']),
         'name':product['name'],
         'stock':product['stock'],
         'cost':product['cost'],
         'price':product['price'],
         'created_at':product['created_at'],
         'img':product['img'],
         'features':product['features'],
         'discounted_price':float(str(product['discounted_price'])) if product['discounted_price'] else None,
         } for product in all_products
        ]
    return jsonify(all_products)

@app.route("/add_parameter", methods=["PUT"])
def add_parameter():
    products.update_many({}, {"$set": {"discounted_price":None}})
    return jsonify({"message": "new parameter added successfully"})
    
    
if __name__ == '__main__':
    app.run(debug=True) 