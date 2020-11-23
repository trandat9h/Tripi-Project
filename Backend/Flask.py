from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

MongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = MongoClient.get_database('hotel_db')
hotel_column = db.get_collection('hotel_column')


@app.route('/homepage', methods=['GET'])
def index():
    hotel_result = []
    count = 0
    if hotel_column.find({}):
        for hotel in hotel_column.find({}):
            hotel_result.append({"name": hotel['name'], "amenities": [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], "location": hotel['address'],
                                 "rating": 2, "price": 1000000, "images": [hotel['provider_url_1'], hotel['provider_url_2'], hotel['provider_url_3']], "coordinate": {"latitude": hotel['latitude'], "longitude": hotel['longitude']}, 'description': hotel['description']})
            count += 1
            if count == 4:
                break
    return json.dumps(hotel_result)


@app.route('/filter', methods=['POST'])
def search():
    requestData = request.json
    hotel_result = []
    count = 0
    if hotel_column.find({}):
        for hotel in hotel_column.find({'province': requestData['cityFilter'], 'star_number': requestData['star'],'price_mean': {"$gt": requestData['minPriceFilter'],"$lt": requestData['maxPriceFilter'] }}):
            count += 1
            if (count >= (requestData['hotelCountResult']-10) and count < requestData['hotelCountResult']):
                services = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                services[0] = hotel['night_club']
                services[1] = hotel['currency_exchange']
                services[2] = hotel['laundry_service']
                services[3] = hotel['restaurants']
                services[4] = hotel['luggage_storage']
                services[5] = hotel['shops']
                services[6] = hotel['relax_massage']
                services[7] = hotel['relax_spa']
                services[8] = hotel['room_service_24_hour']
                services[9] = hotel['relax_pool']
                services[10] = hotel['tours']
                services[11] = hotel['baby_sitting']
                hotel_result.append({"name": hotel['name'], "amenities": services, "location": hotel['address'],
                                 "rating": hotel['star_number'], "price": hotel['price_mean'], "images": [hotel['provider_url_1'], hotel['provider_url_2'], hotel['provider_url_3']], "coordinate": {"latitude": hotel['latitude'], "longitude": hotel['longitude']}, 'description': hotel['description']})
    return json.dumps(hotel_result)


if __name__ == '__main__':
    app.run(debug=True)
