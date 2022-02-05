import axios from "axios"

export function getUserProfile() {
  return axios.get(`profile`).then(res => res.data)
}