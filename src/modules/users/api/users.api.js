import axiosClient from 'common/config/api.config'

export function getUserProfile() {
	return axiosClient.get(`profile`).then(res => {
		return res.data
	})
}

export function updateUserProfile(user_name, data) {
	return axiosClient.patch(`profile/${user_name}`, data)
}
