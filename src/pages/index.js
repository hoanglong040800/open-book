import HeadTitle from 'common/components/headtitle/HeadTitle'
import { getUserProfile } from 'modules/users/api/users.api'
import { useEffect, useState } from 'react'

export default function Home() {
  const [profile, setProfile] = useState()

  useEffect(async () => {
    const profile = await getUserProfile()
    setProfile(profile)
  }, [])

  return (
    <>
      <HeadTitle page='home' />

      <h1>Home Page</h1>

      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  )
}