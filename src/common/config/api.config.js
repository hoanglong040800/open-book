import axios from "axios"

export function setApiConfig() {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
  if (typeof window !== 'undefined' && localStorage['access_token'] !== undefined) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage['access_token']}`
  }

  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.put['Content-Type'] = 'application/json'
  axios.defaults.headers.patch['Content-Type'] = 'application/json'

  axios.interceptors.response.use(
    res => {
      return Promise.resolve(res.data)
    },
    err => {
      if (err.response)
        return Promise.resolve(err.response.data)

      return {
        status: 503,
        message: 'Server Down'
      }
    }
  )
}