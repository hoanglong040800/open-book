export default async function fetchSignin(apiUrl, credentials) {
  try {
    const res = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    const resObj = await res.json()

    return resObj
  } catch (e) {
    return null
  }
}

export async function fetchSignup(apiUrl, data) {
  try {
    const res = await fetch(`${apiUrl}/signup`, {
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
