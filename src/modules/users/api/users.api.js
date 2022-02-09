import axios from "axios"

export function getUserProfile() {
  return axios.get(`profile`).then(res => res.data)
}

export function updateUserProfile(user_name, data) {
  return axios.patch(`profile/${user_name}`, data).then(res => res)
}