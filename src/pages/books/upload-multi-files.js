import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { AlertSnackbar, CenteredContainer, HeadTitle, SubmitButton } from 'common/components'
import { ACCEPT_FILE_TYPES, USER_ROLES } from 'common/constants'
import { uploadFileWithProgress } from 'modules/upload/api/upload.api'
import UploadProgressTable from 'modules/upload/components/UploadProgressTable'
import { useState } from 'react'

const THUMBNAILS = {
	type: 'thumbnails',
	accept: ACCEPT_FILE_TYPES.THUMBNAIL,
}

const PDF = {
	type: 'PDF',
	accept: ACCEPT_FILE_TYPES.PDF,
}

export default function UploadMultiFiles() {
	const [selectedFiles, setSelectedFiles] = useState([])
	const [uploadType, setUploadType] = useState(THUMBNAILS)
	const [isAlertOpen, setIsAlertOpen] = useState(false)

	function handleUploadFiles(e) {
		const fileList = e.target.files
		let tempSelectedFiles = []

		for (let i = 0; i < fileList.length; i++) {
			let file = {
				file: fileList[i],
				name: fileList[i].name,
				percentCompleted: 0,
				fileId: null,
				linkStorage: '',
			}

			tempSelectedFiles.push(file)
		}

		setSelectedFiles(tempSelectedFiles)
	}

	async function handleSubmit() {
		selectedFiles.forEach(async (el, index) => {
			const { fileIndex, data } = await uploadFileWithProgress(
				el.file,
				index,
				updateProgressBar,
			)

			let clonedSelectedFile = selectedFiles
			clonedSelectedFile[fileIndex].fileId = data.id
			clonedSelectedFile[fileIndex].linkStorage = data.link_storage
			// need to reset before setstate so UI can update
			setSelectedFiles([])
			setSelectedFiles(clonedSelectedFile)
		})
	}

	async function updateProgressBar(percentCompleted, fileIndex) {
		let clonedSelectedFile = selectedFiles
		clonedSelectedFile[fileIndex].percentCompleted = percentCompleted
		// need to reset before setstate so UI can update
		setSelectedFiles([])
		setSelectedFiles(clonedSelectedFile)
	}

	function handleToggleUploadType(e, value) {
		setUploadType(value == THUMBNAILS.type ? THUMBNAILS : PDF)
	}

	function handleCopyLinksToClipboard() {
		const copiedLinks = selectedFiles.map(item => item.linkStorage).join('\n')
		navigator.clipboard.writeText(copiedLinks)
		setIsAlertOpen(true)
	}

	function handleCloseAlert() {
		setIsAlertOpen(false)
	}

	return (
		<>
			<HeadTitle page={`Upload ${uploadType.type}`} />

			<CenteredContainer title={`Upload ${uploadType.type}`}>
				<ToggleButtonGroup
					value={uploadType.type}
					exclusive
					orientation="horizontal"
					color="secondary"
					size="small"
					onChange={handleToggleUploadType}
				>
					<ToggleButton value="thumbnails">Thumbnails</ToggleButton>
					<ToggleButton value="PDF">PDF</ToggleButton>
				</ToggleButtonGroup>

				<p className="mt-x-large">
					Upload {uploadType.type} here to retreive multiple file IDs used for
					adding multiple books later
				</p>

				<input
					multiple
					required
					type="file"
					accept={uploadType.accept}
					onChange={handleUploadFiles}
				/>

				<SubmitButton text="Submit" onClick={handleSubmit} />
			</CenteredContainer>

			<UploadProgressTable
				selectedFiles={selectedFiles}
				handleCopyLinksToClipboard={handleCopyLinksToClipboard}
			/>

			<AlertSnackbar
				open={isAlertOpen}
				onClose={handleCloseAlert}
				severity="success"
				message="Copied link to clipboard"
			/>
		</>
	)
}

UploadMultiFiles.auth = true
UploadMultiFiles.allowedRole = USER_ROLES.store
