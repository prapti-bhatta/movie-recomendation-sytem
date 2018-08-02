import psycopg2

db_host = 'localhost'
db_name = 'movie_recommendation'
db_user = 'postgres'
db_password = 'password'


def connect_db():
    conn = psycopg2.connect(host=db_host, database=db_name, user=db_user, password=db_password)
    print('Connected to database...')
    return conn


def insert_recommendations (conn, recommendations):
    print('Inserting new recommendations')
    cur = conn.cursor()
    args_str = b','.join(cur.mogrify("(%s,%s,%s)", x) for x in recommendations)
    cur.execute(b"INSERT INTO recommendations_bysimilarusers (user_id, movie_id, rating) VALUES " + args_str)
    cur.close()


def clear_recommendations (conn):
    print('Clearing existing recommendations...')
    cur = conn.cursor()
    cur.execute('DELETE FROM recommendations_bysimilarusers')
    cur.close()


def get_reviews (conn):
    print('Fetching all ratings from database...')
    cur = conn.cursor()
    cur.execute('select user_id, json_object_agg(movie_id, rating) from movies_moviereviews GROUP BY user_id')
    records = cur.fetchall()
    cur.close()

    existing_users = [str(i[0]) for i in records]

    # Fetch users who don't have any reviews
    cur = conn.cursor()
    cur.execute('select id, json_build_object() from auth_user where id not in ('+ ','.join(existing_users) +')')
    users = cur.fetchall()
    records.extend(users)
    cur.close()

    return records