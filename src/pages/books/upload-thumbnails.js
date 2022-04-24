import { HeadTitle, SubmitButton } from 'common/components'
import { USER_ROLES } from 'common/constants'
import { FormLayout } from 'common/layouts'
import { uploadFileWithProgress } from 'modules/upload/api/upload.api'
import { useState } from 'react'

export default function UploadThumbnails() {
	const [selectedFiles, setSelectedFiles] = useState([])

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

		// need to reset [] before setstate
		setSelectedFiles([])
		setSelectedFiles(clonedSelectedFile)
	}

	return (
		<>
			<HeadTitle page="Upload Thumbnails" />

			<FormLayout title="Upload Thumbnails">
				<p>
					Upload thumbnails here to retreive multiple links used for add
					multiple books later
				</p>

				<input
					multiple
					required
					type="file"
					accept="image/png, image/gif, image/jpeg"
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

UploadThumbnails.auth = true
UploadThumbnails.allowedRole = USER_ROLES.store
