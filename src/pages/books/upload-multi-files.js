import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { HeadTitle, SubmitButton } from 'common/components'
import { USER_ROLES } from 'common/constants'
import { FormLayout } from 'common/layouts'
import { uploadFileWithProgress } from 'modules/upload/api/upload.api'
import { useState } from 'react'

const IMAGES = {
	type: 'images',
	accept: 'image/png, image/gif, image/jpeg',
}

const PDF = {
	type: 'PDF',
	accept: '.pdf',
}

export default function UploadMultiFiles() {
	const [selectedFiles, setSelectedFiles] = useState([])
	const [uploadType, setUploadType] = useState(IMAGES)

	function handleUploadFiles(e) {
		const fileList = e.target.files
		let tempSelectedFiles = []

		for (let i = 0; i < fileList.length; i++) {
			let file = {
				file: fileList[i],
				name: fileList[i].name,
				percentCompleted: 0,
				link_storage: '',
			}

			tempSelectedFiles.push(file)
		}

		setSelectedFiles(tempSelectedFiles)
	}

	async function handleSubmit() {
		selectedFiles.forEach(async (el, index) => {
			const { fileIndex, link_storage } = await uploadFileWithProgress(
				el.file,
				index,
				updateProgressBar,
			)

			// console.log(fileIndex, link_storage)
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
		setUploadType(value == IMAGES.type ? IMAGES : PDF)
	}

	return (
		<>
			<HeadTitle page={`Upload ${uploadType.type}`} />

			<FormLayout title={`Upload ${uploadType.type}`}>
				<ToggleButtonGroup
					value={uploadType.type}
					exclusive
					orientation="horizontal"
					color="secondary"
					size="small"
					onChange={handleToggleUploadType}
				>
					<ToggleButton value="images">Images</ToggleButton>
					<ToggleButton value="PDF">PDF</ToggleButton>
				</ToggleButtonGroup>

				<p style={{ marginTop: 30 }}>
					Upload {uploadType.type} here to retreive multiple links used for add
					multiple books later
				</p>

				<input
					multiple
					required
					type="file"
					accept={uploadType.accept}
					onChange={handleUploadFiles}
				/>

				<SubmitButton text="Submit" onClick={handleSubmit} />

				{selectedFiles?.map((item, index) => (
					<div
						style={{ display: 'flex', gap: 10, alignItems: 'center' }}
						key={index}
					>
						<h3>{index}</h3>

						<p>{item.name}</p>

						<b>{item.percentCompleted}%</b>
					</div>
				))}
			</FormLayout>
		</>
	)
}

UploadMultiFiles.auth = true
UploadMultiFiles.allowedRole = USER_ROLES.store
