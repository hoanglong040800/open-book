import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {
	URL_ADD_MULTI_BOOKS,
	URL_DASHBOARD,
	URL_UPLOAD_MULTI_FILES,
} from 'common/constants'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function StoreNavLink() {
	const mui = useStyles()
	const router = useRouter()
	const [session] = useSession()

	function handleRouting(url) {
		router.push(url)
	}

	return (
		<div className={mui.root}>
			<Button
				onClick={() => handleRouting(URL_DASHBOARD(session?.user.user_name))}
				className={mui.button}
			>
				Dashboard
			</Button>

			<Button
				onClick={() => handleRouting(URL_ADD_MULTI_BOOKS)}
				className={mui.button}
			>
				Add Books
			</Button>

			<Button
				onClick={() => handleRouting(URL_UPLOAD_MULTI_FILES)}
				className={mui.button}
			>
				Upload Files
			</Button>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		margin: theme.spacing(0, 1),
	},

	button: {
		color: '#fff',
		margin: theme.spacing(0, 0.5),
		fontSize: '1rem',
		fontWeight: 'bold',
	},
}))
