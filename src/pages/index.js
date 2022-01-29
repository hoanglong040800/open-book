import Head from 'next/head'

export async function getServerSideProps() {
  return {
    props: {

    },
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>

      <h1>Home Page</h1>
    </>
  )
}