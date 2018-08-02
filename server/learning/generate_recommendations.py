#https://medium.com/ai-society/a-concise-recommender-systems-tutorial-fa40d5a9c0fa

import psycopg2

db_host = 'localhost'
db_name = 'movie_recommendation'
db_user = 'postgres'
db_password = 'password'

conn = psycopg2.connect(host=db_host, database=db_name, user=db_user, password=db_password)
print('Connected to database...')

print('Fetching all ratings from database...')
cur = conn.cursor()

cur.execute('select user_id, json_agg(json_build_object(movie_id, rating)) from movies_moviereviews GROUP BY user_id')

records = cur.fetchall()
print(records)
print('Done fetching reviews!')

cur.close()
conn.close()