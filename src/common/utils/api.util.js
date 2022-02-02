import axios from "axios"

export function handleApiResponse(resObj) {
  if (resObj.status === 200) {
    return resObj.data
  }

  else {
    throw new Error(resObj.message)
  }
}

export function setAuthorization(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}