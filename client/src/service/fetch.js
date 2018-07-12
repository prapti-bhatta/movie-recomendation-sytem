const API_ROOT = 'http://127.0.0.1:8000/api/'

export default function fetch (url, options) {
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
