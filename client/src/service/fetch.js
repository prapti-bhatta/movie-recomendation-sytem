import { getSession } from './session'

const API_ROOT = 'http://127.0.0.1:8000/api/'

export default function fetch (url, options = {}) {
  const _options = {...options}
  if (options.body) {
    const body = new window.FormData()
    for (const field in options.body) {
      body.set(field, options.body[field])
    }
    _options.body = body
  }
  return window.fetch(API_ROOT + url, _options)
}

export function combineErrors (e, res) {
  const result = {}
  if (res.status === 400) {
    for (const key in e) {
      let val = e[key]
      if (Array.isArray(val)) {
        val = val.join(',')
      }
      result[key] = val
    }
    if (result.non_field_errors) {
      result.global = result.non_field_errors
      delete result.non_field_errors
    }
  } else if (res.status === 401) {
    result.global = 'You must be logged in to perform that action'
  } else {
    result.global = 'An unknown error occured'
  }
  return result
}

export function authenticatedFetch (url, options = {}) {
  const token = getSession().token
  if (!token) return Promise.reject(new Error('You need to be logged in to perform this request'))

  const headers = new window.Headers()
  headers.set('Authorization', `Token ${token}`)

  return fetch(url, {
    ...options,
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}
