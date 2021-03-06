import fetch, { combineErrors, authenticatedFetch } from '../fetch'
import { setSession, clearSession, setSessionUser } from '../session'

export function login (username, password) {
  return fetch('auth/token', {
    method: 'POST',
    body: { username, password }
  }).then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res.json()
        .then(tokenBody => {
          setSession(tokenBody.token)
          return getUserData()
            .then((userBody) => {
              setSessionUser(userBody)
            })
        })
    } else {
      return res.json()
        .then((e) => { throw combineErrors(e, res) })
    }
  })
}

export function getUserData () {
  return authenticatedFetch('users/me')
    .then(res => res.json())
}

export function register (firstName, lastName, email, password) {
  return fetch('users/register/', {
    method: 'POST',
    body: {
      'first_name': firstName,
      'last_name': lastName,
      'email': email,
      'password': password,
      'username': email
    }
  }).then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res.json()
    } else {
      return res.json()
        .then((e) => { throw combineErrors(e, res) })
    }
  })
}

export function logout () {
  clearSession()
  return Promise.resolve()
}
