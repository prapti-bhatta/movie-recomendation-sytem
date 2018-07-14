# Movie Recommendation System

**Setup Instructions**
- Set the password for PostgreSQL root user to 'password'
- Create a database called movie_recommendations
- `cd server`
- `pip install -r requirements.txt`
- `cd movie_server`
- `python manage.py migrate`
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

**Tools**
1. Python v3.x.x
2. Node v8.11.3 LTS
3. PostgreSQL v10.4.1

**Frameworks**
1. Django (Backend)
2. ReactJS (Frontend)