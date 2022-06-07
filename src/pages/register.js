import { yupResolver } from '@hookform/resolvers/yup'
import { getSession, signIn } from 'next-auth/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	CenteredContainer,
	AlertSnackbar,
	FooterButtons,
	HeadTitle,
	TextFieldController,
} from 'common/components'
import { COMMON_ALERT, REGISTER_ALERT } from 'common/constants'
import { REGISTER_SCHEMA } from 'common/schema'
import { fetchRegister } from 'modules/auth/api/auth.api'

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx)

	if (session) {
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
		}
	}

	return {
		props: {},
	}
}

export default function Register() {
	const {
		watch,
		control,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: yupResolver(REGISTER_SCHEMA),
	})

	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [alertProps, setAlertProps] = useState({
		severity: '',
		message: '',
	})

	async function onSubmit(credentials) {
		const res = await fetchRegister(credentials)

		setAlertProps(
			res.status === 200
				? REGISTER_ALERT.success
				: res.status === 503
				? COMMON_ALERT.internet
				: res.message.includes('exists')
				? REGISTER_ALERT.duplicate
				: COMMON_ALERT.error,
		)
		setOpenSnackbar(true)
	}

	function onError(error) {
		throw error
	}

	function handleCloseSnackbar() {
		if (alertProps.severity === 'success') {
			signIn('credentials', {
				user_name: watch('user_name'),
				password: watch('password'),
				redirect: true,
				callbackUrl: `/`,
			})
		}

		setOpenSnackbar(false)
	}

	return (
		<>
			<HeadTitle page="register" />

			<CenteredContainer title="register" type="form">
				<TextFieldController
					name="user_name"
					label="Username"
					required
					control={control}
					errors={errors}
				/>

				<TextFieldController
					name="email"
					label="Email"
					required
					control={control}
					errors={errors}
				/>

				<TextFieldController
					name="password"
					label="Password"
					required
					type="password"
					control={control}
					errors={errors}
				/>

				<TextFieldController
					name="password_confirmation"
					label="Password Confirmation"
					required
					type="password"
					control={control}
					errors={errors}
				/>

				<FooterButtons
					text="Register"
					onClick={handleSubmit(onSubmit, onError)}
				/>
			</CenteredContainer>

			<AlertSnackbar
				open={openSnackbar}
				onClose={handleCloseSnackbar}
				severity={alertProps.severity}
				message={alertProps.message}
			/>
		</>
	)
}
