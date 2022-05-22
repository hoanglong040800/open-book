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

export async function addMultiBooks(file) {
	const formData = new FormData()
	formData.append('csv', file)
	return axiosClient.post(`books/auto_generate/books`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
}

export async function getAddMultiBooksLog(jobId) {
	const res = {
		data: {
			total: 5,
			ebooks: [
				{
					name: 'book 1',
					thumbnail: 'link 1',
					genres: [
						{
							id: 2,
							status: 1,
							name_en: 'Comics',
						},
						{
							id: 1,
							status: 1,
							name_en: 'Children',
						},
					],
					status: false,
					error: 'LINK_NOT_FOUND',
				},
				{
					name: 'book 2',
					thumbnail: 'link 2',
					genres: [
						{
							id: 2,
							status: 1,
							name_en: 'Comics',
						},
						{
							id: 1,
							status: 1,
							name_en: 'Children',
						},
					],
					status: false,
					error: 'NAME_NOT_FOUND',
				},
				{
					name: 'book 3',
					thumbnail: 'link 3',
					genres: [
						{
							id: 2,
							status: 1,
							name_en: 'Comics',
						},
						{
							id: 1,
							status: 1,
							name_en: 'Children',
						},
					],
					status: false,
					error: 'PREDICT_GENRE_FAILED',
				},
				{
					name: 'book 4',
					thumbnail: 'link 4',
					genres: [
						{
							id: 2,
							status: 1,
							name_en: 'Comics',
						},
						{
							id: 1,
							status: 1,
							name_en: 'Children',
						},
					],
					status: false,
					error: 'LINK_NOT_FOUND',
				},
				{
					name: 'book 5',
					thumbnail: 'link 5',
					genres: [
						{
							id: 2,
							status: 1,
							name_en: 'Comics',
						},
						{
							id: 1,
							status: 1,
							name_en: 'Children',
						},
					],
					status: false,
					error: 'THUMBNAIL_NOT_FOUND',
				},
				{
					name: 'book 6',
					thumbnail: 'link 6',
					genres: [
						{
							id: 2,
							status: 1,
							name_en: 'Comics',
						},
						{
							id: 1,
							status: 1,
							name_en: 'Children',
						},
					],
					status: false,
					error: 'PUBLISHED_YEAR_INVALID',
				},
			],
		},
		status: 200,
	}

	// return axiosClient.get(`books/${jobId}`)
	await getAllBooks()
	return res.data.ebooks
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
