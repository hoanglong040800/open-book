import { handleApiResponse } from "common/utils/api.util"

export default async function fetchSignin(credentials) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
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

export async function fetchSignup(credentials) {
  
}
