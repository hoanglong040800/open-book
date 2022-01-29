import { Box } from '@material-ui/core'
import { getThesesBySearch } from 'modules/theses/fetch-theses'
import ThesesTable from 'modules/theses/table/ThesesTable'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export async function getServerSideProps() {
  return {
    props: {
      apiUrl: process.env.API_URL,
    },
  }
}

export default function SearchPage({ apiUrl }) {
  const router = useRouter()
  const [rows, setRows] = useState([])

  useEffect(async () => {
    const data = await getThesesBySearch(apiUrl, router.query.q)
    setRows(data)
  }, [router.query.q])

  return (
    <>
      <Head>
        <title>Kết quả tìm kiếm</title>
      </Head>

      <h1>
        Kết quả tìm kiếm cho: <span>{router.query.q}</span>
      </h1>

      <Box mt={5}>
        <ThesesTable rows={rows} />
      </Box>
    </>
  )
}
