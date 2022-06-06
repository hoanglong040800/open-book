import {
	AlertSnackbar,
	HeadTitle,
	FooterButtons,
	TableGrid,
	CenteredContainer,
	CustomTooltip,
} from 'common/components'
import {
	ACCEPT_FILE_TYPES,
	COMMON_ALERT,
	SEVERITY,
	URL_DASHBOARD,
	URL_UPLOAD_MULTI_FILES,
	USER_ROLES,
} from 'common/constants'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { addMultiBooks, getAddMultiBooksLog } from 'modules/books/api'
import { ebooksLogColDef } from 'modules/books/books.contant'
import { Button, Typography } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons'

export default function AddMultiBooks() {
	const router = useRouter()
	const [selectedFile, setSelectedFile] = useState(null)
	const [isOpenAlert, setIsOpenAlert] = useState(false)
	const [alertProps, setAlertProps] = useState({
		severity: 'success',
		message: '',
	})
	const [log, setLog] = useState({
		id: null,
		total: null,
		succeeded: null,
		failed: null,
		file: {},
		ebooks: [],
	})
	const [isAddingEbooks, setIsAddingEbooks] = useState(false)

	function handleSelectFile(e) {
		if (e.target.files.length === 0) return

		setSelectedFile(e.target.files[0])
	}

	async function handleSubmit() {
		try {
			setIsAddingEbooks(true)
			const data = await addMultiBooks(selectedFile)

			// log need more time to created
			setTimeout(async () => {
				await getEbookLogs(data.job_id)
				setAlertProps({
					severity: SEVERITY.SUCCESS,
					message: 'Add multiple books successfully',
				})
			}, 1000)
		} catch (e) {
			setAlertProps(COMMON_ALERT.error)
		} finally {
			document.getElementById('csv-file').value = ''
			setSelectedFile(null)
			setIsOpenAlert(true)
			setIsAddingEbooks(false)
		}
	}

	async function getEbookLogs(jobId) {
		try {
			const res = await getAddMultiBooksLog(jobId)

			setLog({
				...res.data,
				file: { ...res.data.file, localFileName: selectedFile.name },
			})
		} catch (e) {
			throw e
		}
	}

	function handleCloseAlert() {
		setIsOpenAlert(false)
	}

	function handleGoToDashboard() {
		router.push(URL_DASHBOARD)
	}

	return (
		<>
			<HeadTitle page="Add Multi Books" />

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

				<FooterButtons
					isLoading={isAddingEbooks}
					text="Submit"
					onClick={handleSubmit}
					primaryDisabled={!selectedFile}
				/>
			</CenteredContainer>

			{log?.id && !isAddingEbooks && (
				<>
					<CenteredContainer className="mt-x2-large">
						<div className="flex justify-between align-center">
							<div className="flex gap-medium align-center">
								<Typography>
									Result of{' '}
									<span className="font-weight-bold">
										{log?.file.localFileName}
									</span>
								</Typography>

								<Check color="primary" />
								<Typography>{log?.succeeded}</Typography>

								<Close color="error" />
								<Typography>{log?.failed}</Typography>
							</div>

							<div>
								<Button onClick={handleGoToDashboard} className="ml-medium">
									Go to Dashboard →
								</Button>
							</div>
						</div>
					</CenteredContainer>

					{log?.failed && (
						<TableGrid
							showOrdinalNumber
							rows={log?.ebooks}
							columns={ebooksLogColDef}
							className="mt-large"
						/>
					)}
				</>
			)}

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
