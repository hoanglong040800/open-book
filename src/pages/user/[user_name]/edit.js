import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Box, Button, MenuItem } from '@material-ui/core'
import {
	CenteredContainer,
	AlertSnackbar,
	HeadTitle,
	SelectController,
	TextFieldController,
} from 'common/components'
import { getUserProfile, updateUserProfile } from 'modules/users/api/users.api'
import { COMMON_ALERT } from 'common/constants'
import { EDIT_PROFILE_SCHEMA } from 'common/schema'

export default function EditProfile() {
	const {
		watch,
		reset,
		control,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: yupResolver(EDIT_PROFILE_SCHEMA),
		defaultValues: {},
	})

	const router = useRouter()
	const [profile, setProfile] = useState(null)
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [snackbarProps, setSnackbarProps] = useState({
		severity: '',
		message: '',
	})

	useEffect(() => {
		async function getUserInfo() {
			const data = await getUserProfile()
			setProfile(data)
			reset(data)
		}

		getUserInfo()
	}, [])

	function handleCloseSnackbar() {
		snackbarProps.severity === 'success' &&
			router.push(`/user/${profile.user_name}`)

		setOpenSnackbar(false)
	}

	async function onSubmit(input) {
		const res = await updateUserProfile(profile.user_name, input)

		setSnackbarProps(res ? COMMON_ALERT.success : COMMON_ALERT.error)
		setOpenSnackbar(true)
	}

	function onError(error) {}

	return (
		<>
			<HeadTitle page="edit profile" />

			<CenteredContainer title="edit profile"  type="form">
				<TextFieldController
					name="full_name"
					label="Full name"
					required
					control={control}
					errors={errors}
				/>

				<SelectController
					name="gender"
					label="Gender"
					control={control}
					errors={errors}
				>
					<MenuItem value="male">Male</MenuItem>
					<MenuItem value="female">Female</MenuItem>
				</SelectController>

				<Box display="flex" justifyContent="flex-end" mt={3}>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit(onSubmit, onError)}
					>
						Save
					</Button>
				</Box>
			</CenteredContainer>

			<AlertSnackbar
				open={openSnackbar}
				onClose={handleCloseSnackbar}
				severity={snackbarProps.severity}
				message={snackbarProps.message}
			/>
		</>
	)
}

EditProfile.auth = true
