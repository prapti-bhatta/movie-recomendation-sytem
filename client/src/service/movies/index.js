import fetch, { authenticatedFetch } from '../fetch'
import preview from './preview'

export function fetchNewestMovies (page = 0, limit = 10) {
  return fetch(`movies?offset=${page}&limit=${limit}`)
    .then(res => res.json())
    .then(({results}) => {
      results.forEach((movie) => {
        if (!movie.preview) movie.preview = preview
      })
      return results
    })
}

export function getMovieInfo (id) {
  return fetch(`movies/${id}/`)
    .then(res => res.json())
    .then(movie => {
      if (!movie.preview) movie.preview = preview
      return movie
    })
}

export function searchMovies (query = '', page = 0, limit = 10) {
  return fetch(`movies/?search=${query}&offset=${page}&limit=${limit}`)
    .then(res => res.json())
    .then(({results}) => {
      results.forEach((movie) => {
        if (!movie.preview) movie.preview = preview
      })
      return results
    })
}

export function createMovie (title, releaseDate, genre, description, preview) {
  return authenticatedFetch('movies/', {
    method: 'POST',
    body: {
      title, description, 'release_date': releaseDate, genre, preview
    }
  })
}

export function editMovie (id, title, releaseDate, genre, description, preview) {
  return authenticatedFetch(`movies/${id}/`, {
    method: 'PATCH',
    body: {
      title, description, 'release_date': releaseDate, genre, preview
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

export function recommendedMovies (page = 0, limit = 10) {
  return authenticatedFetch(`recommendations/similar-users?offset=${page}&limit=${limit}`)
    .then(res => res.json())
    .then(recs => recs.results.map(rec => ({preview, ...rec.movie})))
}

export function othersAlsoLikeMovies (movieId, page = 0, limit = 10) {
  return fetch(`recommendations/others-liked?movie=${movieId}&offset=${page}&limit=${limit}`)
    .then(res => res.json())
    .then(recs => recs.results.map(rec => ({preview, ...rec.movie})))
}
