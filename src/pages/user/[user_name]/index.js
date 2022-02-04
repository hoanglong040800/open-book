import HeadTitle from 'common/components/headtitle/HeadTitle'
import { useRouter } from 'next/router'

export default function ViewProfile() {
  const router = useRouter()
  const { user_name } = router.query

  return (
    <>
      <HeadTitle page='profile' />

      <h1>Profile + Bookmark of {user_name}</h1>
    </>
  )
}