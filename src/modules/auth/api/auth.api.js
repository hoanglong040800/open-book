import { API_URL } from "common/constants/url.constant"
import { handleApiResponse } from "common/utils/api.util"

export default async function fetchSignin(credentials) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    const resObj = await res.json()

    return handleApiResponse(resObj)
  } catch (e) {
    return null
  }
}

export async function fetchSignup(data) {
  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const resObj = await res.json()

    return resObj
  } catch (e) {
    return false
  }
}
