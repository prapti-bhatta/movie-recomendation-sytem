import fetch from '../fetch'

export function getAllGenre () {
  return fetch('genre/')
    .then(res => res.json())
}
