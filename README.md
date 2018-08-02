# Movie Recommendation System

**Setup Instructions**
- Set the password for PostgreSQL root user to 'password'
- Create a database called movie_recommendations
- Setup libraries
    - `cd server`
    - `pip install -r requirements.txt`
- Run Migrations
    - `cd movie_server`
    - `python manage.py migrate`
    - `cd ../scripts`
    - `python generatefixtures.py`
- Load Fixtures
    - `cd ../movie_server`
    - `python manage.py loaddata users`
    - `python manage.py loaddata genre`
    - `python manage.py loaddata movies`
    - `python manage.py loaddata movie_reviews`
- `cd ../../client`
- `npm install`

**Creating an admin User**
`python manage.py createsuperuser`

**Running**
- Run Server
    - `cd server/movie_server`
    - `python manage.py runserver`
- Run Client
    - `cd client`
    - `npm start`

**Generating Recommendations**
- `cd server/learning`
- `python generate_recommendations.py`

**Tools**
1. Python v3.x.x
2. Node v8.11.3 LTS
3. PostgreSQL v10.4.1

**Frameworks**
1. Django (Backend)
2. ReactJS (Frontend)