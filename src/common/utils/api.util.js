import axios from "axios"

export function handleApiResponse(resObj) {
  if (resObj.status === 200) {
    return resObj.data
  }

  else {
    throw new Error(resObj.message)
  }
}

export function setRequestConfig() {
  if (typeof window !== 'undefined') {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage['access_token']}`
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
  }
}