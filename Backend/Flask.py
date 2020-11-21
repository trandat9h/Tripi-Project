from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

MongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = MongoClient.get_database('hotel_db')
hotel_columns = db.get_collection('hotel_column')


@app.route('/homepage', methods=['GET'])
def index():
    hotel_result = []
    count = 0
    if hotel_columns.find({}):
        for hotel in hotel_columns.find({}):
            hotel_result.append({"name": hotel['name'], "amenities": [1, 1, 0, 1, 1, 1], "location": hotel['address'],
                                 "rating": 2, "commentNumber": hotel['reviews_number'], "price": 100, "images": [hotel['provider_url']],"coordinate":{"latitude": hotel['latitude'],"longitude": hotel['longitude']},'description':hotel['description']})
            count += 1
            if count == 4:
                break
    return json.dumps(hotel_result)
    # return jsonify(hotel)


if __name__ == '__main__':
    app.run(debug=True)

hotel = [
    {
        "name": "hello",
        "location": "bla blo",
        "rating": 4,
        "commentNumber": 5,
        "likeNumber": 10,
        "price": 100,
        "images": [
            "https://pix6.agoda.net/hotelImages/109/10960/10960_14030410560018536291.jpg?s=1024x770",
            "https://pix6.agoda.net/hotelImages/109/10960/10960_16063010130044276883.jpg?s=1024x768",
            "https://pix6.agoda.net/hotelImages/109/10960/10960_16122818320050019719.jpg?s=1024x768",
        ],
        "coordinate": {
            "latitude": 21.0331573486328,
            "longitude": 105.807968139648,
        },
        "amenities": [1, 1, 0, 1, 1, 1],
        "description":
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
        "name": "Khách sạn Sofitel Legend Metropole Hà Nội",
        "location": "Số 15, Phố Ngô Quyền, Quận Hoàn Kiếm, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
        "rating": 4,
        "commentNumber": 5,
        "likeNumber": 10,
        "price": 300,
        "images": [
            "https://pix6.agoda.net/hotelImages/109/10960/10960_14030410560018536291.jpg?s=1024x770",
            "https://pix6.agoda.net/hotelImages/109/10960/10960_16063010130044276883.jpg?s=1024x768",
            "https://pix6.agoda.net/hotelImages/109/10960/10960_16122818320050019719.jpg?s=1024x768",
        ],
        "coordinate": {
            "latitude": 21.0177397649356,
            "longitude": 105.841995477676,
        },
        "amenities": [1, 1, 0, 1, 1, 1],
        "description":
        "Khách sạn Sofitel Legend Metropole Hà Nội được xây dựng vào năm 1901 thời thuộc địa Pháp. Nằm ở trung tâm Hà Nội, khách sạn có một lịch sử phong phú và truyền thống kéo dài một thế kỷ phục vụ các vị đại sứ, nhà văn, chính khách quốc gia và doanh nhân. Một khu vườn đẹp, ẩm thực Pháp tại Le Beaulieu và đặc sản Hà Nội tại nhà hàng Spices Garden. Khách sạn Sofitel Legend Metropole Hà Nội có năm phòng hội nghị, một hồ bơi và phòng tập thể dục luôn đón tiếp khách hàng. Khách sạn Sofitel Legend Metropole Hà Nội đã được dùng là một điểm mốc kỷ niệm ngày thế kỷ cũ trôi qua. Du khách sẽ được thưởng thức sự duyên dáng, pha trộn sự hiếu khách của người Việt Nam với di sản châu Âu sang trọng.",
    },
    {
        "name": "Khách Sạn du Parc Hà Nội",
        "location": "84 Trần Nhân Tông, Quận Hai Bà Trưng, Hà Nội",
        "rating": 4,
        "commentNumber": 5,
        "likeNumber": 10,
        "price": 200,
        "images": [
            "https://pix6.agoda.net/hotelImages/109/10960/10960_14030410560018536291.jpg?s=1024x770",
            "https://pix6.agoda.net/hotelImages/109/10960/10960_16063010130044276883.jpg?s=1024x768",
            "https://pix6.agoda.net/hotelImages/109/10960/10960_16122818320050019719.jpg?s=1024x768",
        ],
        "coordinate": {
            "latitude": 21.0256214141845,
            "longitude": 105.855667114257,
        },
        "amenities": [1, 1, 0, 1, 1, 1],
        "description":
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
]
