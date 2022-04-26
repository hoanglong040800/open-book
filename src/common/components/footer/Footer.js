import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import Link from 'next/link'
import { WEB_NAME } from 'common/constants/common.constant'
import { URL_FILTER_BOOKS, URL_HOME } from 'common/constants'
import { Facebook, LinkedIn, Reddit, Twitter } from '@material-ui/icons'

export default function Footer() {
	const classes = useStyle()

	return (
		<footer className={classes.footer}>
			<Container maxWidth="xl">
				<Grid container className={classes.container}>
					<Grid item xs={12} md={4}>
						<Typography
							variant="h5"
							align="center"
							className={classes.footerHeading}
						>
							{WEB_NAME}
						</Typography>

						<Typography variant="subtitle1" align="center" gutterBottom>
							<span className={classes.link}>
								<Link href={URL_HOME}>Home</Link>
							</span>
							<span className={classes.whiteLine}>|</span>
							<span className={classes.link}>
								<Link href={URL_FILTER_BOOKS}>Explore</Link>
							</span>
						</Typography>
					</Grid>

					<Grid item xs={12} md={4}>
						<Typography variant="h6" className={classes.infoHeading}>
							About us
						</Typography>
						<Typography variant="subtitle2" className={classes.info}>
							Open Book is a Ebook commerce platform for reading book online.
							Our platform is believe to be one of the greatest book platform in
							the world. With over 1,000,000 users and about 300 stores across
							countries, we will provide you the best service you ever have. Now
							open a book and read!
						</Typography>
					</Grid>

					<Grid item xs={12} md={4}>
						<Typography variant="h6" className={classes.infoHeading}>
							Social media
						</Typography>

						<Box display="flex" gridGap={20}>
							<Facebook fontSize={iconSize} />
							<LinkedIn fontSize={iconSize} />
							<Reddit fontSize={iconSize} />
							<Twitter fontSize={iconSize} />
						</Box>
					</Grid>
				</Grid>

				<br />
				<hr />

				<Typography variant="subtitle2" className={classes.copyright}>
					Copyright &copy; 2021 {WEB_NAME}
				</Typography>
			</Container>
		</footer>
	)
}

const iconSize = 'large'

const useStyle = makeStyles(theme => ({
	footer: {
		backgroundColor: theme.palette.primary.main,
		color: '#fff',
		padding: '0.5rem 0',
	},

	container: {
		margin: '1rem 0',
	},

	[theme.breakpoints.down('sm')]: {
		infoHeading: {
			marginTop: '1.25rem',
		},
	},

	[theme.breakpoints.up('md')]: {
		info: {
			borderLeft: '1px solid #fff',
			padding: '0 1rem',
			minHeight: '80%',
		},
	},

	footerHeading: {
		color: 'white',
		fontWeight: 'bold',
	},

	infoHeading: {
		letterSpacing: 1.3,
		marginBottom: '0.3rem',
	},

	link: {
		'&:hover': {
			textDecoration: 'underline',
		},
	},

	whiteLine: {
		padding: '0 10px',
	},

	copyright: {
		opacity: 0.5,
	},
}))
