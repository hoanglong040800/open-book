import { getUserProfile } from 'modules/users/api/users.api'
import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const profile = getUserProfile()
  }, [])

  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>

      <h1>Home Page</h1>
    </>
  )
}