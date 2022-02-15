import axios from 'axios'

const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

axiosClient.interceptors.request.use(async config => {
	if (
		typeof window !== 'undefined' &&
		localStorage['access_token'] !== undefined
	) {
		config.headers['Authorization'] = `Bearer ${localStorage['access_token']}`
	}

	return config
})

axiosClient.interceptors.response.use(
	res => {
		return res.data
	},

	err => {
		if (err.response) return err.response.data

		return {
			status: 503,
			message: 'Server Down',
		}
	},
)
export default axiosClient
