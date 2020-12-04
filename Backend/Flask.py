from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json

# package for predict model


from gensim.models import Word2Vec

from suggest import suggest

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

MongoClient = MongoClient('mongodb://127.0.0.1:27017')
hotel_db = MongoClient.get_database('hotel_db')
hotel_column = hotel_db.get_collection('hotel_column')
hotel_user_info = MongoClient.get_database('hotel_user_info')
hotel_search_history = hotel_user_info.get_collection('hotel_search_history')
hotel_reviews = hotel_db.get_collection('hotel_reviews')
similar_hotel = MongoClient.get_database('similar_hotel')
top_5 = similar_hotel.get_collection('top_5')


@app.route('/homepage', methods=['GET'])
def index():
    hotel_result = []
    count = 0
    if hotel_column.find({}):
        for hotel in hotel_column.find({}):
            hotel_result.append({"name": hotel['name'], "amenities": [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], "location": hotel['address'],
                                 "rating": 2, "price": 1000000, "images": [hotel['provider_url_1'], hotel['provider_url_2'], hotel['provider_url_3']], "coordinate": {"latitude": hotel['latitude'], "longitude": hotel['longitude']}, 'description': hotel['description'], 'hotel_id': hotel['hotel_id'], 'domain_hotel_id':hotel['domain_hotel_id'], 'domain_id':hotel['domain_id']})
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
        for hotel in hotel_column.find({'province': requestData['cityFilter'], 'star_number': requestData['star'], 'price_mean': {"$gt": requestData['minPriceFilter'], "$lt": requestData['maxPriceFilter']}}):
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
                                     "rating": hotel['star_number'], "price": hotel['price_mean'], "images": [hotel['provider_url_1'], hotel['provider_url_2'], hotel['provider_url_3']], "coordinate": {"latitude": hotel['latitude'], "longitude": hotel['longitude']}, 'description': hotel['description'], 'hotel_id': hotel['hotel_id'], 'domain_hotel_id':hotel['domain_hotel_id'], 'domain_id':hotel['domain_id']})
    return json.dumps(hotel_result)


@app.route('/cityFilter', methods=['POST'])
def cityFilter():
    hotel_result=[]
    requestData = request.json
    count = 0
    if hotel_column.find({}):
        for hotel in hotel_column.find({'province': requestData['city']}):
            count += 1
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
            hotel_result.append({'domain_hotel_id':hotel['domain_hotel_id'], 'domain_id':hotel['domain_id'],"name": hotel['name'], "amenities": services, "location": hotel['address'],
                                 "rating": hotel['star_number'], "price": hotel['price_mean'], "images": [hotel['provider_url_1'], hotel['provider_url_2'], hotel['provider_url_3']], "coordinate": {"latitude": hotel['latitude'], "longitude": hotel['longitude']}, 'description': hotel['description'], 'hotel_id': hotel['hotel_id']})
            if count == 10:
                break
    return json.dumps(hotel_result)

@app.route('/updateModal', methods=['POST'])
def idAdd():
    requestData = request.json
    hotel_search_history.insert({"user_id":'1',"hotel_id":requestData['Id']})

@app.route('/predict', methods=['GET'])
def predict():
    hotel_data = []
    hotel_result = []
    predict_input = []
    if hotel_search_history.find({}):
        for hotel in hotel_search_history.find({}):
            predict_input.append(hotel['hotel_id'])
    cur_session = []
    MODEL_PATH = 'model/hotel_session.model'
    model = Word2Vec.load(MODEL_PATH)
    item = list(model.wv.vocab.keys())
    for i in range(len(predict_input)):
        if str(predict_input[i]) in item:
            cur_session.append(str(predict_input[i]))
    hotel_result = suggest(cur_session, 5)
    #return json.dumps(hotel_result)
    for hotelId in hotel_result:
        for hotel in hotel_column.find({"hotel_id": int(hotelId)}):
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
            hotel_data.append({'domain_hotel_id':hotel['domain_hotel_id'], 'domain_id':hotel['domain_id'],"name": hotel['name'], "amenities": services, "location": hotel['address'],
                                     "rating": hotel['star_number'], "price": hotel['price_mean'], "images": [hotel['provider_url_1'], hotel['provider_url_2'], hotel['provider_url_3']], "coordinate": {"latitude": hotel['latitude'], "longitude": hotel['longitude']}, 'description': hotel['description'], 'hotel_id': hotel['hotel_id']})
    return json.dumps(hotel_data)

@app.route('/reviews', methods=['POST'])
def getReviews():
    #requestData = request.json
    reviews = []
    if hotel_reviews.find({}):
        for review in hotel_reviews.find({'hotel_id': 29529}):
            reviews.append({'detail':review['review'],'score':review['score'], 'number':review['num_reviews'], 'score_mean': review['score_mean'],'user':review['username'],'emotion':review['Is_Response']  })
    return json.dumps(reviews)

@app.route('/similar', methods=['POST'])
def getSim():
    requestData = request.json
    hotel_result = []
    #simHotel_id = [45005, 43280, 29494] 
    if top_5.find({}):
        for hotel in top_5.find({'hotel_id': requestData['id']}):
            simHotel_id = [hotel['0'], hotel['1'], hotel['2']]
    for hotelId in simHotel_id:  
        for hotel in hotel_column.find({'hotel_id': hotelId}):
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
            hotel_result.append({'domain_hotel_id':hotel['domain_hotel_id'], 'domain_id':hotel['domain_id'],"name": hotel['name'], "amenities": services, "location": hotel['address'],
                                    "rating": hotel['star_number'], "price": hotel['price_mean'], "images": [hotel['provider_url_1'], hotel['provider_url_2'], hotel['provider_url_3']], "coordinate": {"latitude": hotel['latitude'], "longitude": hotel['longitude']}, 'description': hotel['description'], 'hotel_id': hotel['hotel_id']})
    return json.dumps(hotel_result)
    











if __name__ == '__main__':
    app.run(debug=True)
