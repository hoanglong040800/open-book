export const SEVERITY = {
	SUCCESS: 'success',
	ERROR: 'error',
}

export const REGISTER_ALERT = {
	success: {
		severity: SEVERITY.SUCCESS,
		message: 'Register successfully. Auto signup for you',
	},

	duplicate: {
		severity: SEVERITY.ERROR,
		message: 'User already exists. Please choose another',
	},
}

export const COMMON_ALERT = {
	success: {
		severity: SEVERITY.SUCCESS,
		message: 'Success',
	},

	internet: {
		severity: SEVERITY.ERROR,
		message: 'The server is temporary down',
	},

	error: {
		severity: SEVERITY.ERROR,
		message: 'Something is wrong. Please try again',
	},
}

export const ALERT_ADD_MULTI_BOOKS = {
	SUCCESS: {
		severity: SEVERITY.SUCCESS,
		message: 'Add multi books successfully. Showing result',
	},

	ERROR: {
		severity: SEVERITY.ERROR,
		message: 'Something is wrong. Please try again',
	},
}
