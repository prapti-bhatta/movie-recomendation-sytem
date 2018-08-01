import fetch, { authenticatedFetch } from '../fetch'
import preview from './preview'

export function fetchPopularMovies () {
  return fetch('movies')
    .then(res => res.json())
    .then((movies) => {
      movies.forEach((movie) => {
        movie.preview = preview
        movie.rating = (Math.random() * 6)
      })
      return movies
    })
}

export function getMovieInfo (id) {
  return fetch(`movies/${id}/`)
    .then(res => res.json())
    .then(movie => {
      movie.preview = preview
      return movie
    })
}

export function searchMovies (query = '') {
  return fetch(`movies/?search=${query}`)
    .then(res => res.json())
    .then((movies) => {
      movies.forEach((movie) => {
        movie.preview = preview
        movie.rating = (Math.random() * 6)
      })
      return movies
    })
}

export function createMovie (title, releaseDate, genre, description) {
  return authenticatedFetch('movies/', {
    method: 'POST',
    body: {
      title, description, 'release_date': releaseDate, genre
    }
  })
}

export function editMovie (id, title, releaseDate, genre, description) {
  return authenticatedFetch(`movies/${id}/`, {
    method: 'PATCH',
    body: {
      title, description, 'release_date': releaseDate, genre
    }
  })
}

export function getMovieReviews (id) {
  return fetch(`movies/reviews?movie=${id}`)
    .then(res => res.json())
}

export function getMovieReviewByUser (movieId, userId) {
  return fetch(`movies/reviews?movie=${movieId}&user=${userId}`)
    .then(res => res.json())
    .then(arr => arr[0])
}

export function postMovieReview (movieId, comment, rating) {
  return authenticatedFetch(`movies/reviews/`, {
    method: 'POST',
    body: {
      comment, rating: Number(rating), movie: movieId
    }
  }).then(res => res.json())
}
