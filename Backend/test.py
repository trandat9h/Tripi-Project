import pandas as pd
import datetime
import time
import matplotlib.pyplot as plt
import sqlite3
import multiprocessing
from gensim.models import Word2Vec

from suggest import suggest

MODEL_PATH = 'model/hotel_session.model'
model = Word2Vec.load(MODEL_PATH)

item = list(model.wv.vocab.keys())
n = 5
cur_session = []
for i in range(n):
    cur_session.append(item[i])


if __name__ == "__main__":

    result = suggest(cur_session, 5)
    print(result)


# HOW TO RUN
# python test.py
# output: ['45463', '45576', '45572', '45545', '29792']