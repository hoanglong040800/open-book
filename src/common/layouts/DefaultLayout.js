import { Box, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Footer from 'common/components/footer/Footer'
import NavLeftDrawer from 'common/components/navbar/drawer/NavLeftDrawer'
import Navbar from 'common/components/navbar/Navbar'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'

export default function DefaultLayout({ children }) {
  const classes = useStyle()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [session, isLoading] = useSession()

  useEffect(() => {
    if (!isLoading && session) {
      // alert('can set local storage')
      window.localStorage['access_token'] = session.access_token
    }
    // else alert('false')

  }, [session, isLoading])

  return (
    <>
      <Navbar onOpenDrawer={() => setOpenDrawer(true)} />

      <NavLeftDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />

      <div className={classes.container}>
        <Container maxWidth="xl" className={classes.content}>
          <Box mt={13} mb={10}>
            {children}
          </Box>
        </Container>
        <Footer />
      </div>
    </>
  )
}

const useStyle = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },

  content: {
    flexGrow: 1,
  },
}))
