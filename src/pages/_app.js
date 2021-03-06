import Head from 'next/head'
import { Provider as SessionProvider } from 'next-auth/client'
import AuthGuard from 'modules/auth/components/AuthGuard'

// theme
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'common/themes/theme'
import 'common/themes/global.css'
import 'common/themes/utils.css'
import 'common/themes/colors.css'
import 'common/themes/mui-override.css'
import 'common/themes/common.css'

import DefaultLayout from 'common/layouts/DefaultLayout'
import { WEB_NAME } from 'common/constants'

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>{WEB_NAME}</title>
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

						{/* authorize user & role */}
						<AuthGuard
							isAuth={Component.auth}
							allowedRole={Component.allowedRole}
						>
							<Component {...pageProps} />
						</AuthGuard>
					</DefaultLayout>
				</ThemeProvider>
			</SessionProvider>
		</>
	)
}
