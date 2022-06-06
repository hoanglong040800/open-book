import { createTheme } from '@material-ui/core'
import { red, deepOrange, teal } from '@material-ui/core/colors'

const theme = createTheme({
	palette: {
		primary: {
			light: teal[200],
			main: teal[400],
			dark: teal[600],
		},
		secondary: {
			light: deepOrange[300],
			main: deepOrange[500],
			dark: deepOrange[700],
		},
		error: {
			main: red[400],
		},

		background: {
			default: '#fff',
		},
	},

	breakpoints: {
		values: {
			xs: 0,
			sm: 480, //default: 600
			md: 768, //default: 960
			lg: 1024, //default: 1280
			xl: 1280, //default: 1920
		},
	},

	typography: {
		button: {
			textTransform: 'inherit',
		},

		h1: {
			fontSize: '2.5rem',
			fontWeight: 'bolder',
		},

		h2: {
			fontSize: '2.3rem',
			fontWeight: 'bolder',
		},

		h3: {
			fontSize: '2rem',
			fontWeight: 'bolder',
		},

		h4: {
			fontSize: '1.8rem',
			fontWeight: 'bold',
		},

		h5: {
			fontSize: '1.5rem',
			fontWeight: 'bold',
		},

		h6: {
			fontSize: '1.3rem',
			fontWeight: 'bold',
		},
	},
})

export default theme
