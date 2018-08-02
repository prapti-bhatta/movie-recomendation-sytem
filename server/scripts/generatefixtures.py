import time
import json
import datetime
import csv
from os import listdir, path, mkdir
from random import randrange, shuffle

reviews_per_movie = 10
reviews_per_user = 15
num_reviews = 1000

# Get all review files
files = listdir('./reviews')
num_files = len(files)

# Select needed review files
if num_files < num_reviews:
    num_reviews = num_files

files = files[0:num_reviews]

# Shuffle Reviews
shuffle(files)

# Decide how many movies and users to create
num_movies = int(num_reviews / reviews_per_movie)
num_users = reviews_per_movie

genre_list = ['Action', 'Adventure', 'Drama', 'Action', 'Sports', 'Crime', 'Thriller', 'Sci-fi', 'History', 'Documentary']
num_genre = len(genre_list)


def read_movies():
    print ('Reading movie data...')
    with open('./movies.csv', newline='') as csv_file:
        data = list(csv.DictReader(csv_file))
        return data


def genre_fixtures():
    print('Generating fixtures for genre...')
    current_date = str(datetime.datetime.fromtimestamp(time.time()))
    genres = []

    for i in range(num_genre):
        genre = {
            'model': 'genre.genre',
            'pk': i,
            'fields': {
                'name': genre_list[i],
                'description': '',
                'created_at': current_date,
                'updated_at': current_date
            }
        }
        genres.append(genre)

    if not path.exists('../movie_server/genre/fixtures'):
        mkdir('../movie_server/genre/fixtures')

    with open('../movie_server/genre/fixtures/genre.json', 'w') as genre_file:
        json.dump(genres, genre_file)


def movie_fixtures(movies_list):
    print('Generating fixtures for movies...')
    movies = []

    for i in range(num_movies):
        movie_meta = movies_list[i]

        movie = {
            'model': 'movies.movies',
            'pk': i,
            'fields': {
                'title': movie_meta['original_title'],
                'description': movie_meta['overview'],
                'created_at': str(datetime.datetime.fromtimestamp(time.time())),
                'updated_at': str(datetime.datetime.fromtimestamp(time.time())),
                'release_date': datetime.datetime.fromtimestamp(time.time() - (i * 2160000)).strftime("%Y-%m-%d"),
                'genre_id': randrange(0, num_genre),
                'preview': 'https://image.tmdb.org/t/p/w780' + movie_meta['poster_path']
            }
        }
        movies.append(movie)

    if not path.exists('../movie_server/movies/fixtures'):
        mkdir('../movie_server/movies/fixtures')

    with open('../movie_server/movies/fixtures/movies.json', 'w') as movies_file:
        json.dump(movies, movies_file)


def user_fixtures():
    print('Generating fixtures for users...')
    users = []

    for i in range(num_users):
        postfix = str(i)
        user = {
            'model': 'auth.user',
            'pk': i,
            'fields': {
                'is_superuser': False,
                'password': 'pbkdf2_sha256$100000$cPQQgU3kaM0q$GlywnYQ8Xq2DwImXWtk0PZi0XmVkqfB7t23gJ4hNU4Y=',
                'username': 'user' + postfix,
                'first_name': 'firstName' + postfix,
                'last_name': 'lastName' + postfix,
                'email': 'user' + postfix + '@fakemail.com',
                'is_staff': False,
                'is_active': True,
                'date_joined': str(datetime.datetime.fromtimestamp(time.time() - (i * 2160000)))
            }
        }
        users.append(user)

    if not path.exists('../movie_server/users/fixtures'):
        mkdir('../movie_server/users/fixtures')

    with open('../movie_server/users/fixtures/users.json', 'w') as users_file:
        json.dump(users, users_file)


def review_fixtures():
    print('Generating fixtures for reviews...')
    current_date = str(datetime.datetime.fromtimestamp(time.time()))
    reviews = []

    done_reviews = 0

    for movie_id in range(num_movies):
        reviews_for_this_movie = randrange(0, reviews_per_movie + 1)
        start_review_index = done_reviews

        for review_count in range(reviews_for_this_movie):
            index = start_review_index + review_count
            file = files[index]
            rating, _ = file.split('_')[1].split('.')

            with open('./reviews/'+file, 'r') as review_file:
                review = {
                    'model': 'movies.moviereviews',
                    'pk': index,
                    'fields': {
                        'rating': int(rating),
                        'comment': review_file.read().replace('\n', ''),
                        'created_at': current_date,
                        'updated_at': current_date,
                        'movie_id': movie_id,
                        'user_id': review_count
                    }
                }

                reviews.append(review)

        done_reviews += reviews_for_this_movie

        if not path.exists('../movie_server/movies/fixtures'):
            mkdir('../movie_server/movies/fixtures')

        with open('../movie_server/movies/fixtures/movie_reviews.json', 'w') as reviews_file:
            json.dump(reviews, reviews_file)


user_fixtures()
genre_fixtures()
movies_list = read_movies()
movie_fixtures(movies_list)
review_fixtures()