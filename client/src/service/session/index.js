const SESSION_KEY = 'auth'

const DEFAULT_SESSION = {
  token: '',
  user: {}
}

let currentSession = getSessionFromStorage()

export function setSession (token, user) {
  currentSession = { ...currentSession, token, user }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(currentSession))
}

export function setSessionUser (user) {
  currentSession = { ...currentSession, user }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(currentSession))
}

export function getSession () {
  return currentSession
}

function getSessionFromStorage () {
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
