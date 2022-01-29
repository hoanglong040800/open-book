import { colDef } from 'common/constants/common.constant'
import { fetchThesesWithQuery } from 'modules/theses/fetch-theses'
import ThesesTable from 'modules/theses/table/ThesesTable'
import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchAllFaculties, fetchAllTags } from 'modules/fetch-common'
import { getIdByValueInArrObj } from 'common/utils/common.util'
import FilterInputs from 'modules/theses/filter/FilterInputs'

export async function getServerSideProps() {
  const apiUrl = process.env.API_URL
  const allFaculties = await fetchAllFaculties(apiUrl)
  const allTags = await fetchAllTags(apiUrl)

  return {
    props: {
      apiUrl,
      allFaculties,
      allTags,
    },
  }
}

export default function Theses({ apiUrl, allFaculties, allTags }) {
  const router = useRouter()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchRows() {
      setLoading(true)

      const filterQuery = {
        name: router.query.name || '',
        faculty:
          router.query.faculty === '' ||
          getIdByValueInArrObj(
            allFaculties,
            'name_short_vn',
            router.query.faculty
          ),
        published_year: router.query.published_year || '',
        tag: getIdByValueInArrObj(allTags, 'name_short_en', router.query.tag),
        sort: 'upload_date',
        order: 'desc',
      }

      const data = await fetchThesesWithQuery(
        apiUrl,
        new URLSearchParams(filterQuery).toString()
      )

      setRows(data)
      setLoading(false)
    }

    fetchRows()
  }, [router.query, allFaculties, allTags, apiUrl])

  function handleFilter(data) {
    router.push(
      {
        pathname: '/explore',
        query: {
          ...data,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  // handle error
  if (rows === false) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>Luận văn</title>
      </Head>

      <h1>Trang lọc luận văn</h1>

      <FilterInputs
        allFaculties={allFaculties}
        allTags={allTags}
        defaultValues={router.query}
        onFilter={handleFilter}
      />

      <ThesesTable
        columns={colDef}
        rows={rows}
        pageSize={5}
        hideFooter={false}
        loading={loading}
      />
    </>
  )
}
