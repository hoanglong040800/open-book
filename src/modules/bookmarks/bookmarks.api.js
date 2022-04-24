import axiosClient from 'common/config/api.config'

export async function getAllBookmarksByUser() {
	return axiosClient.get('bookmark').then(res => res.data)
}

export async function addBookmark(bookId) {
	return axiosClient.post(`bookmark/${bookId}`)
}

export async function deleteBookmark(bookId) {
	return axiosClient.delete(`bookmark/${bookId}`)
}
