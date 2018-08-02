#References:
#https://medium.com/ai-society/a-concise-recommender-systems-tutorial-fa40d5a9c0fa
#https://cambridgespark.com/content/tutorials/implementing-your-own-recommender-systems-in-Python/index.html
#https://hackernoon.com/introduction-to-recommender-system-part-1-collaborative-filtering-singular-value-decomposition-44c9659c5e75

from pearson_similarity import similarity
from recommend import recommend
from db_operations import connect_db, get_reviews, insert_recommendations, clear_recommendations

conn = connect_db()

records = get_reviews(conn)

num_users = len(records)

to_insert = []

for i in range(num_users):
    user_id = records[i][0]
    recommendations = recommend(records, i, 10, similarity)
    as_tuples = [(user_id, int(item), recommendations[item]) for item in recommendations]
    to_insert.extend(as_tuples)

print('Done fetching reviews!')

clear_recommendations(conn)
insert_recommendations(conn, to_insert)

conn.commit()
conn.close()