import axiosClient from 'common/config/api.config'
import { updateProgress } from 'common/utils'

export async function uploadFile(file) {
	const formData = new FormData()
	formData.append('file', file)

	return axiosClient.post('upload', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
}

export async function uploadFileWithProgress(
	file,
	fileIndex = null,
	updateProgressBar = null,
) {
	const formData = new FormData()
	formData.append('file', file)

	return axiosClient
		.post('upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},

			onUploadProgress: progressEvent => {
				let percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total,
				)

				// percent only count when file upload to server, not count when file is handled in server
				// allow max percent is 90, only change to 100 when resquest actually complete
				percentCompleted = percentCompleted === 100 ? 90 : percentCompleted

				updateProgressBar(percentCompleted, fileIndex)
			},
		})
		.then(res => {
			updateProgressBar(100, fileIndex)

			return { fileIndex: fileIndex, link_storage: res.data.link_storage }
		})
}
