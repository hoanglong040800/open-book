import axiosClient from 'common/config/api.config'
import { uploadFile } from 'modules/upload/api/upload.api'

export async function addBook(data) {
	// upload pdf
	const resFile = await uploadFile(data.file[0])
	if (!resFile.status && resFile.status !== 200) return resFile

	// upload image
	const resThumbnail = await uploadFile(data.thumbnail[0])
	if (!resFile.status && resFile.status !== 200) return resThumbnail

	data.file = resFile.data
	data.thumbnail = resThumbnail.data

	return addBookInfo(data)
}

export async function addBookInfo(data) {
	return axiosClient.post('books', data)
}

export async function getAllBooks() {
	return axiosClient.get(`books`).then(res => {
		return res.data
	})
}

export async function getBooksByFilter(params) {
	return axiosClient.get('books/filter', { params })
}

export async function getBooksBySearch(params) {
	return axiosClient.get('books/search', { params })
}

export async function getBookById(id) {
	return axiosClient.get(`books/${id}`).then(res => res.data)
}

export async function getBookBySlug(slug) {
	return axiosClient.get(`books/slug/${slug}`).then(res => res.data)
}

export async function updateBookInfo(id, data) {
	return axiosClient.patch(`books/${id}`, data)
}

export async function deleteBook(id) {
	return axiosClient.delete(`books/${id}`)
}
