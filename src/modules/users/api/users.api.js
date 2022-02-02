import axios from "axios"

export function getUserProfile() {
  axios.get(`profile`)
    .then(res => {
      const resObj = res.json()
      return resObj.data
    })
    .catch(error => console.log(error))
}