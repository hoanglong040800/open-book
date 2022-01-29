import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'common/themes/theme'
import 'common/styles/global.css'
import DefaultLayout from 'common/layouts/DefaultLayout'
import { Provider as SessionProvider } from 'next-auth/client'
import Auth from 'modules/auth/components/Auth'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Theses Share - Nơi chia sẻ khóa luận</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <DefaultLayout>
            <CssBaseline />

            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </DefaultLayout>
        </ThemeProvider>
      </SessionProvider>
    </>
  )
}
