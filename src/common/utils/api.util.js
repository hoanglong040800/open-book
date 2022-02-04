import axios from "axios"

export function setRequestConfig() {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
  axios.defaults.headers.common['Authorization'] =
    typeof window !== 'undefined' && `Bearer ${localStorage['access_token']}`

  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.put['Content-Type'] = 'application/json'
  axios.defaults.headers.patch['Content-Type'] = 'application/json'

  axios.interceptors.response.use(
    res => {
      return Promise.resolve(res.data.data)
    },
    err => {
      throw err.response.data.message
    }
  )
}