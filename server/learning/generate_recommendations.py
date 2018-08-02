#https://medium.com/ai-society/a-concise-recommender-systems-tutorial-fa40d5a9c0fa
#https://cambridgespark.com/content/tutorials/implementing-your-own-recommender-systems-in-Python/index.html
#https://hackernoon.com/introduction-to-recommender-system-part-1-collaborative-filtering-singular-value-decomposition-44c9659c5e75
import json
import psycopg2
from pearson_similarity import similarity
from recommend import recommend

db_host = 'localhost'
db_name = 'movie_recommendation'
db_user = 'postgres'
db_password = 'password'

conn = psycopg2.connect(host=db_host, database=db_name, user=db_user, password=db_password)
print('Connected to database...')

print('Fetching all ratings from database...')
cur = conn.cursor()

cur.execute('select user_id, json_object_agg(movie_id, rating) from movies_moviereviews GROUP BY user_id')

records = cur.fetchall()

num_users = len(records)

for i in range(num_users):
    user_id = records[i][0]
    recommendations = recommend(records, i, 10, similarity)
    sorted_by_rating = sorted(recommendations.items(), key=lambda kv: kv[1], reverse=True)
    items_only = [i[0] for i in sorted_by_rating]
    print(items_only)

print('Done fetching reviews!')

cur.close()
conn.close()