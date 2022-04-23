import { COMMON_ALERT } from 'common/constants/alert.constant'

export function toTitleCase(str) {
	const regex = /(^\w|\s\w)(\S*)/g
	return str.replace(regex, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())
}

export function handleSimpleServiceError(res) {
	return res.status === 200 || res.status === true
		? COMMON_ALERT.success
		: COMMON_ALERT.error
}

export function filterObject(obj, callback) {
	return Object.fromEntries(
		Object.entries(obj).filter(([key, val]) => callback(val, key)),
	)
}

export function checkRole(session,role) {
	if (!session) return false

	if (session?.user?.role === role) return true
	else return false
}
