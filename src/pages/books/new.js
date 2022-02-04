import HeadTitle from 'common/components/headtitle/HeadTitle'
import { USER_ROLES } from 'common/constants/common.constant'
import { getSession } from 'next-auth/client'

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  if (session.user.role === USER_ROLES.viewer)
    return {
      notFound: true
    }

  return {
    props: {
      session
    }
  }
}

export default function NewBook({ session }) {
  return (
    <>
      <HeadTitle page='new book' />

      <h1>Add New Book</h1>
    </>
  )
}