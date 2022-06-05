import {
	AlertSnackbar,
	HeadTitle,
	SubmitButton,
	TableGrid,
	CenteredContainer,
	CustomTooltip,
} from 'common/components'
import {
	ACCEPT_FILE_TYPES,
	ALERT_ADD_MULTI_BOOKS,
	URL_DASHBOARD,
	URL_UPLOAD_MULTI_FILES,
	USER_ROLES,
} from 'common/constants'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { addMultiBooks, getAddMultiBooksLog } from 'modules/books/api'
import { ebooksLogColDef } from 'modules/books/books.contant'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { isNotEmpty } from 'empty-utils'
import { Help } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
	arrow: {
		color: theme.palette.common.black,
	},
	tooltip: {
		backgroundColor: theme.palette.common.black,
	},
}))

export default function AddMultiBooks() {
	const mui = useStyles()
	const router = useRouter()
	const [selectedFile, setSeletedFile] = useState(null)
	const [isOpenAlert, setIsOpenAlert] = useState(false)
	const [alertProps, setAlertProps] = useState({
		severity: '',
		message: '',
	})
	const [ebooksLog, setEbooksLog] = useState([])
	const [isAddingEbooks, setIsAddingEbooks] = useState(false)

	function handleSelectFile(e) {
		if (e.target.files.length === 0) return

		const file = e.target.files[0]
		setSeletedFile(file)
	}

	async function handleSubmit() {
		try {
			setIsAddingEbooks(true)
			const res = await addMultiBooks(selectedFile)

			setAlertProps(
				res.status === 200
					? ALERT_ADD_MULTI_BOOKS.SUCCESS
					: ALERT_ADD_MULTI_BOOKS.ERROR,
			)
			setIsOpenAlert(true)

			// todo uncomment
			// getEbookLogs(res.jobId)
			await getEbookLogs()

			// reset input file value
			document.getElementById('csv-file').value = ''
		} catch (e) {
			throw e
		} finally {
			setIsAddingEbooks(false)
		}
	}

	async function getEbookLogs(jobId) {
		const ebooksLog = await getAddMultiBooksLog(jobId)
		setEbooksLog(ebooksLog)
	}

	function handleCloseAlert() {
		setIsOpenAlert(false)
	}

	function handleGoToDashboard() {
		router.push(URL_DASHBOARD)
	}

	return (
		<>
			<HeadTitle page="add multi books" />

			<CenteredContainer type="form">
				<div className="flex align-center gap-small">
					<h1>Add Multiple Books</h1>

					<CustomTooltip type="helper">
						<Typography>
							Upload file contains ebook information, Open Book will{' '}
							<span className="font-weight-bold">
								generate genres automatically
							</span>{' '}
							and add all ebooks for you in a single click!
						</Typography>

						<Typography>
							Please make sure you have image & pdf links before uploading. If
							not,{' '}
							<Link href={URL_UPLOAD_MULTI_FILES}>
								<a className="link-color-dark-theme font-weight-bold">
									click here to upload and retrieve links!
								</a>
							</Link>
						</Typography>
					</CustomTooltip>
				</div>

				<div className="flex mx-auto">
					<div>
						<input
							id="csv-file"
							required
							type="file"
							accept={ACCEPT_FILE_TYPES.ADD_MULTI_BOOKS}
							onChange={handleSelectFile}
						/>

						<Typography>Accept {ACCEPT_FILE_TYPES.ADD_MULTI_BOOKS}</Typography>
					</div>
				</div>

				<SubmitButton
					isLoading={isAddingEbooks}
					text="Submit"
					onClick={handleSubmit}
				/>

				{isNotEmpty(ebooksLog) && !isAddingEbooks && (
					<Button onClick={handleGoToDashboard} className="mt-large">
						Go to Dashboard →
					</Button>
				)}
			</CenteredContainer>

			<TableGrid
				rows={ebooksLog}
				columns={ebooksLogColDef}
				showOrdinalNumber
				className="mt-large"
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
