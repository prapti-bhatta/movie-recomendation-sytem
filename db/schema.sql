/* Users Table */

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_type INT NOT NULL, /* 0 = User, 1 = Content Creator, 2 = Admin */
    password_hash CHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

/* Genre Table */

CREATE TABLE genre (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

/* Movies Table */

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE,
    genre INT REFERENCES genre(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

/* Movie Review Table */

CREATE TABLE movie_reviews (
    id SERIAL PRIMARY KEY,
    comment TEXT,
    rating INT,
    user_id INT REFERENCES users(id),
    movie_id INT REFERENCES movies(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
)