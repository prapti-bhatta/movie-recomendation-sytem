import fetch, { authenticatedFetch } from '../fetch'
import preview from './preview'

export function fetchPopularMovies (page = 0, limit = 10) {
  return fetch(`movies?offset=${page}&limit=${limit}`)
    .then(res => res.json())
    .then(({results}) => {
      results.forEach((movie) => {
        movie.preview = preview
        movie.rating = (Math.random() * 6)
      })
      return results
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

export function searchMovies (query = '', page = 0, limit = 10) {
  return fetch(`movies/?search=${query}&offset=${page}&limit=${limit}`)
    .then(res => res.json())
    .then(({results}) => {
      results.forEach((movie) => {
        movie.preview = preview
        movie.rating = (Math.random() * 6)
      })
      return results
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
