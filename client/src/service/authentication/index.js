export function login (username, password) {
  console.log('Login Called', { username, password })
  return Promise.resolve()
}

export function register (firstName, lastName, email, password) {
  console.log('Register Called', { firstName, lastName, email, password })
  return Promise.resolve()
}

export function logout () {
  console.log('Logout Called')
  return Promise.resolve()
}
