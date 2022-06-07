import * as yup from 'yup'

export const REGISTER_SCHEMA = yup.object().shape({
	user_name: yup.string().required().label('Username'),

	email: yup.string().email().required().label('Email'),

	password: yup.string().required().min(1).max(20).label('Password'),

	password_confirmation: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Do not match with password'),
})

const BOOK_INFO_SHAPE = {
	name: yup.string().required().max(255).label('Name'),

	authors: yup.string().required().max(255).label('Authors'),

	genres: yup.array().required().min(1).max(5).label('Genres'),

	publisher: yup.string().max(255).label('Publisher'),

	published_year: yup
		.number()
		.typeError('Required')
		.required()
		.min(1902)
		.max(new Date().getFullYear())
		.label('Published Year'),

	language: yup.string().max(255).label('Language'),

	pages: yup.number().typeError('Required').required().min(0).label('Page'),

	summary: yup.string().max(1000).label('Summary'),
}

export const ADD_BOOK_SCHEMA = yup.object().shape({
	file: yup
		.mixed()
		.test('required', 'Books is required', value => value.length)
		.test('fileSize', 'File exceeds 10MB', value =>
			value.length ? value[0].size <= 1000000 : false,
		),

	thumbnail: yup
		.mixed()
		.test('required', 'Thumbnail is required', value => value.length)
		.test('fileSize', 'File exceeds 1MB', value =>
			value.length ? value[0].size <= 1000000 : true,
		),

	...BOOK_INFO_SHAPE,
})

export const EDIT_BOOK_SCHEMA = yup.object().shape({
	...BOOK_INFO_SHAPE,
})

export const ADD_FAILED_BOOK_SCHEMA = yup.object().shape({
	...BOOK_INFO_SHAPE,
	genres: yup.array(),
})

export const EDIT_PROFILE_SCHEMA = yup.object().shape({
	full_name: yup.string().required().max(255).label('Full name'),

	gender: yup.string().label('Gender'),
})
