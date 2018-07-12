const SESSION_KEY = 'auth'

const DEFAULT_SESSION = {
  token: ''
}

export function setSession (token) {
  const session = { token }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getSession () {
  try {
    const session = JSON.parse(window.localStorage.getItem(SESSION_KEY))
    return session || DEFAULT_SESSION
  } catch (e) {
    return DEFAULT_SESSION
  }
}

export function clearSession () {
  window.localStorage.removeItem(SESSION_KEY)
}

export function isLoggedIn () {
  const session = getSession()
  return !!session.token
}
