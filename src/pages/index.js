import HeadTitle from 'common/components/headtitle/HeadTitle'
import { getUserProfile } from 'modules/users/api/users.api'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const profile = getUserProfile()
  }, [])

  return (
    <>
      <HeadTitle page='home' />

      <h1>Home Page</h1>
    </>
  )
}