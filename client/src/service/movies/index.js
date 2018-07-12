import fetch from '../fetch'
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
