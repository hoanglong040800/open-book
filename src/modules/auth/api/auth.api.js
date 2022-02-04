export default async function fetchLogin(credentials) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    const resObj = await res.json()

    return resObj.data
  } catch (e) {
    return null
  }
}

export async function fetchSignup(credentials) {
  
}
