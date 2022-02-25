import axiosClient from 'common/config/api.config'

export function getRatingByBookId(id) {
	return axiosClient.get(`book/${id}/rating`).then(res => res.data)
}

export function addRating(id, data) {
	return axiosClient.post(`book/${id}/rating`, data)
}
