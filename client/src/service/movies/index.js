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

export function searchMovies (query) {
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
