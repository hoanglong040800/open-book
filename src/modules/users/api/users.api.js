import axios from "axios"

export function getUserProfile() {
  return axios.get(`profile`)
}