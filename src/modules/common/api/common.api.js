import axiosClient from 'common/config/api.config'

export async function getAllBooks() {
	return axiosClient.get(`genres`).then(res => res.data)
}
