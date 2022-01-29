import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
} from '@material-ui/core'
import NavLink from './NavLink'
import NavProfile from './NavProfile'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import NavLogo from './NavLogo'
import { Menu } from '@material-ui/icons'
import NavSearchBar from './search/NavSearchBar'

export default function Navbar({ onOpenDrawer }) {
  const router = useRouter()
  const classes = useStyles()
  const [session, loading] = useSession()

  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Container maxWidth="xl">
          <Box className={classes.toolbar}>
            {/* left side */}
            <Box display="flex">
              <Box className={classes.mobile}>
                <IconButton onClick={onOpenDrawer}>
                  <Menu color="primary" />
                </IconButton>
              </Box>

              <Box className={classes.desktop} alignItems="center">
                <Box mr={1}>
                  <NavLogo />
                </Box>

                <NavLink />
              </Box>
            </Box>

            {/* right side */}
            <Box display="flex" alignItems="center" flex={1}>
              <NavSearchBar />

              {session ? (
                <NavProfile />
              ) : (
                <Box display="flex">
                  <Button
                    color="default"
                    size="small"
                    style={{ marginRight: 5 }}
                    onClick={() => router.push('/signup')}
                  >
                    Đăng ký
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={signIn}
                  >
                    Đăng nhập
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },

  desktop: {
    marginRight: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  mobile: {
    marginRight: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
}))
