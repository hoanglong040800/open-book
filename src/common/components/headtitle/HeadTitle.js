import { WEB_NAME } from "common/constants/common.constant";
import Head from "next/head";
import { toTitleCase } from 'common/utils/common.util'

export default function HeadTitle({ page = '' }) {
  return (
    <Head>
      <title>{toTitleCase(page)} {page && '-'} {WEB_NAME}</title>
    </Head>
  )
}
