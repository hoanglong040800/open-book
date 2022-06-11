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
import { isNotEmpty } from 'empty-utils'
import {
	addMultiBooks,
	getAddMultiBooksLog,
	updateBookCreateByJob,
} from 'modules/books/api'
import { ebooksLogColDef } from 'modules/books/books.contant'
import { Button, IconButton, Typography } from '@material-ui/core'
import { Check, Close, Create } from '@material-ui/icons'
import EditBookModal from 'modules/books/components/action-modal/EditBookModal'

export default function AddMultiBooks() {
	const router = useRouter()
	const [selectedFile, setSelectedFile] = useState(null)
	const [alertConfig, setAlertConfig] = useState({
		isOpen: false,
		severity: '',
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
	const [isOpenEditBookModal, setIsOpenEditBookModal] = useState(false)
	const [selectedBook, setSelectedBook] = useState(null)
	const [isReAddingEbook, setIsReAddingEbook] = useState(false)

	const finalColDef = [
		...ebooksLogColDef,
		{
			field: '', // return full object
			headerName: 'Action',
			width: 150,
			align: 'center',
			renderCell: ebook => (
				<IconButton
					size="small"
					color="primary"
					onClick={() => onEditClick(ebook)}
				>
					<Create fontSize="small" color="primary" />
				</IconButton>
			),
		},
	]

	function handleSelectFile(e) {
		if (e.target.files.length === 0) return

		setSelectedFile(e.target.files[0])
	}

	async function handleSubmit() {
		try {
			setIsAddingEbooks(true)
			const data = await addMultiBooks(selectedFile)

			const getEbookLogsInterval = setInterval(async () => {
				const ebookLog = await getAddMultiBooksLog(data.job_id)

				if (!ebookLog.done) return

				setLog({
					...ebookLog,
					file: { ...ebookLog.file, localFileName: selectedFile?.name || '' },
				})

				setAlertConfig({
					open: true,
					severity: SEVERITY.SUCCESS,
					message: 'Add multiple books successfully',
				})

				document.getElementById('csv-file').value = ''
				setSelectedFile(null)
				setIsAddingEbooks(false)
				clearInterval(getEbookLogsInterval)
			}, 1000)
		} catch (e) {
			setAlertConfig({ ...COMMON_ALERT.error, open: true })
			setIsAddingEbooks(false)
		}
	}

	function handleGoToDashboard() {
		router.push(URL_DASHBOARD)
	}

	async function handleSubmitReAddBook(data) {
		try {
			setIsReAddingEbook(true)
			const payload = {
				...selectedBook.data,
				...data,
			}

			await updateBookCreateByJob(
				selectedBook.job_jd,
				selectedBook.sequence_id,
				payload,
			)

			setAlertConfig({
				open: true,
				severity: 'success',
				message: 'Re-add book successfully',
			})

			setLog({
				...log,
				succeeded: ++log.succeeded,
				failed: --log.failed,
				ebooks: log.ebooks.filter(e => e.id !== selectedBook.id),
			})

			setIsOpenEditBookModal(false)
		} catch (e) {
			setAlertConfig({ ...COMMON_ALERT.error, open: true })
		} finally {
			setIsReAddingEbook(false)
		}
	}

	function onEditClick(ebook) {
		setSelectedBook(ebook)
		setIsOpenEditBookModal(true)
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

					{isNotEmpty(log?.failed) && (
						<TableGrid
							showOrdinalNumber
							rows={log?.ebooks}
							columns={finalColDef}
							className="mt-large"
						/>
					)}
				</>
			)}

			<EditBookModal
				isOpen={isOpenEditBookModal}
				onSubmit={handleSubmitReAddBook}
				onClose={() => setIsOpenEditBookModal(false)}
				selectedBook={selectedBook?.data}
				isSubmitting={isReAddingEbook}
			/>

			<AlertSnackbar
				{...alertConfig}
				onClose={() => setAlertConfig({ ...alertConfig, open: false })}
			/>
		</>
	)
}

AddMultiBooks.auth = true
AddMultiBooks.allowedRole = USER_ROLES.store
