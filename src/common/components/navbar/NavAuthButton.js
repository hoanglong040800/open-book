import { Box, Button } from '@material-ui/core'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function NavAuthButton() {
	const router = useRouter()

	function handleRoutingRegister() {
		router.push('/register')
	}

	return (
		<Box display="flex">
			<Button
				color="inherit"
				variant="outlined"
				size="small"
				style={{ marginRight: 5 }}
				onClick={handleRoutingRegister}
			>
				Register
			</Button>

			<Button
				variant="contained"
				color="secondary"
				size="small"
				onClick={signIn}
			>
				Login
			</Button>
		</Box>
	)
}
