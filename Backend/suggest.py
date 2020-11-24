
from gensim.models import Word2Vec

MODEL_PATH = 'model/hotel_session.model'
model = Word2Vec.load(MODEL_PATH)

item = list(model.wv.vocab.keys())
n = 4
cur_session = []
for i in range(n):
    cur_session.append(item[i])


def suggest(cur_session=[], n=5):

	if cur_session == []:
		print('error')
		return

	similar_hotels = model.wv.most_similar(cur_session)[:n]
	suggested_hotels = []
	
	for i in range(n):
		suggested_hotels.append(similar_hotels[i][0])
	
	return suggested_hotels


if __name__ == "__main__":
    result = suggest(cur_session, 5)
    print(cur_session)
    