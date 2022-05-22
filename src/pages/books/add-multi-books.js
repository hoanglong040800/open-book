import {
	AlertSnackbar,
	HeadTitle,
	SubmitButton,
	TableGrid,
} from 'common/components'
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
import { addMultiBooks, getAddMultiBooksLog } from 'modules/books/api'
import { ebooksLogColDef } from 'modules/books/books.contant'

export default function AddMultiBooks() {
	const router = useRouter()
	const [session] = useSession()
	const [selectedFile, setSeletedFile] = useState(null)
	const [isOpenAlert, setIsOpenAlert] = useState(false)
	const [alertProps, setAlertProps] = useState({
		severity: '',
		message: '',
	})
	const [ebooksLog, setEbooksLog] = useState([])

	function handleSelectFile(e) {
		if (e.target.files.length === 0) return

		const file = e.target.files[0]
		setSeletedFile(file)
	}

	async function handleSubmit() {
		const res = await addMultiBooks(selectedFile)

		setAlertProps(
			res.status === 200
				? ALERT_ADD_MULTI_BOOKS.SUCCESS
				: ALERT_ADD_MULTI_BOOKS.ERROR,
		)
		setIsOpenAlert(true)

		// todo uncomment
		// getEbookLogs(res.jobId)
		getEbookLogs()
	}

	async function getEbookLogs(jobId) {
		const ebooksLog = await getAddMultiBooksLog(jobId)
		console.log(ebooksLog)
		setEbooksLog(ebooksLog)
	}

	function handleCloseAlert() {
		setIsOpenAlert(false)
	}

	return (
		<>
			<HeadTitle page="add multi books" />

			<FormLayout title="add multi books">
				<div className="mb-x-large">
					<p>
						Upload file contains ebook information, Open Book will{' '}
						<span className="font-weight-bold">
							generate genres automatically
						</span>{' '}
						and add all ebooks for you in a single click!
					</p>

					<p>
						Please make sure you have image & pdf links before uploading. If
						not,{' '}
						<Link href={URL_UPLOAD_MULTI_FILES}>
							<a className="link-color">
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

			<TableGrid
				title="Ebooks Log"
				rows={ebooksLog}
				columns={ebooksLogColDef}
				showOrdinalNumber
			/>

			<AlertSnackbar
				open={isOpenAlert}
				onClose={handleCloseAlert}
				severity={alertProps.severity}
				message={alertProps.message}
			/>
		</>
	)
}

AddMultiBooks.auth = true
AddMultiBooks.allowedRole = USER_ROLES.store
