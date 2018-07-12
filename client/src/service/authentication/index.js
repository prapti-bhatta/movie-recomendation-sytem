import fetch, { combineErrors } from '../fetch'
import { setSession, clearSession } from '../session'

export function login (username, password) {
  return fetch('auth/token', {
    method: 'POST',
    body: { username, password }
  }).then(res => {
    if (res.status === 200) {
      return res.json()
        .then(body => {
          setSession(body.token)
          return body
        })
    } else {
      return res.json()
        .then((e) => { throw combineErrors(e) })
    }
  })
}

export function register (firstName, lastName, email, password) {
  console.log('Register Called', { firstName, lastName, email, password })
  return Promise.resolve()
}

export function logout () {
  clearSession()
  return Promise.resolve()
}
