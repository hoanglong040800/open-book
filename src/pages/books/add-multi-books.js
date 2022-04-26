import { AlertSnackbar, HeadTitle, SubmitButton } from 'common/components'
import {
	ACCEPT_FILE_TYPES,
	ALERT_ADD_MULTI_BOOKS,
	SEVERITY,
	URL_DASHBOARD,
	URL_UPLOAD_MULTI_FILES,
	USER_ROLES,
} from 'common/constants'
import { FormLayout } from 'common/layouts'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { addMultiBooks } from 'modules/books/api'

export default function AddMultiBooks() {
	const router = useRouter()
	const [session] = useSession()
	const [selectedFile, setSeletedFile] = useState(null)
	const [isOpenAlert, setIsOpenAlert] = useState(false)
	const [alertProps, setAlertProps] = useState({
		severity: '',
		message: '',
	})

	function handleSelectFile(e) {
		if (e.target.files.length === 0) return

		const file = e.target.files[0]
		setSeletedFile(file)
	}

	async function handleSubmit() {
		// testing only todo delete
		const res = {
			status: 200,
		}

		// todo uncomment
		// const res = await addMultiBooks(selectedFile)

		setAlertProps(
			res.status === 200
				? ALERT_ADD_MULTI_BOOKS.SUCCESS
				: ALERT_ADD_MULTI_BOOKS.ERROR,
		)
		setIsOpenAlert(true)
	}

	function handleCloseAlert() {
		if (alertProps.severity === SEVERITY.SUCCESS) {
			router.push(URL_DASHBOARD(session.user.user_name))
		}

		setIsOpenAlert(false)
	}

	return (
		<>
			<HeadTitle page="add multi books" />

			<FormLayout title="add multi books">
				<div style={styles.description}>
					<p>
						Upload your excel or csv file contains basic information and links,
						Open Book will{' '}
						<span style={styles.bold}>generate genres automatically</span> and
						add all ebooks for you in a single click!
					</p>

					<p>
						Please make sure you have image & pdf links before uploading. If
						not,{' '}
						<Link href={URL_UPLOAD_MULTI_FILES}>
							<a style={styles.link}>
								click here to upload and retrieve links!
							</a>
						</Link>
					</p>
				</div>

				<input
					required
					type="file"
					accept={ACCEPT_FILE_TYPES.ADD_MULTI_BOOKS}
					onChange={handleSelectFile}
				/>

				<p>Accept {ACCEPT_FILE_TYPES.ADD_MULTI_BOOKS}</p>

				<SubmitButton text="Submit" onClick={handleSubmit} />
			</FormLayout>

			<AlertSnackbar
				open={isOpenAlert}
				onClose={handleCloseAlert}
				severity={alertProps.severity}
				message={alertProps.message}
			/>
		</>
	)
}

const styles = {
	link: {
		color: 'blue',
	},

	description: {
		marginBottom: 30,
	},

	bold: {
		fontWeight: 'bold',
	},
}

AddMultiBooks.auth = true
AddMultiBooks.allowedRole = USER_ROLES.store
