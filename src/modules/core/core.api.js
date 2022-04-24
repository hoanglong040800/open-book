import axiosClient from 'common/config/api.config'

export async function getAllGenres() {
	return axiosClient.get(`genres`).then(res => res.data)
}
