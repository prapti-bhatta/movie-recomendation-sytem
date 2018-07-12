import fetch from '../fetch'
import { setSession, clearSession } from '../session'

export function login (username, password) {
  return fetch('auth/token', {
    method: 'POST',
    body: { username, password }
  }).then(res => {
    if (res.status === 200) {
      return res.json()
        .then(res => {
          setSession(res.token)
          return res
        })
    } else {
      return res.json()
        .then(() => { throw res })
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
