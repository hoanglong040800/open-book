import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import Link from 'next/link'
import { WEB_NAME } from 'common/constants/common.constant'

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
								<Link href="/">Home page</Link>
							</span>
							<span className={classes.whiteLine}>|</span>
							<span className={classes.link}>
								<Link href="/about">About us</Link>
							</span>
						</Typography>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography variant="h6" className={classes.infoHeading}>
							About us
						</Typography>
						<Typography variant="subtitle2" className={classes.info}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
							autem voluptatibus aperiam consectetur architecto libero sit aut
							id? Eos corrupti minima provident eum pariatur et suscipit, nemo
							dignissimos modi veniam?
						</Typography>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography variant="h6" className={classes.infoHeading}>
							Social media
						</Typography>
						<Typography variant="subtitle2" className={classes.info}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
							quod?
						</Typography>
					</Grid>
				</Grid>
				<br />
				<hr
					style={{
						color: 'rgba(255,255,255,0.5)',
					}}
				/>
				<Typography variant="subtitle2" className={classes.copyright}>
					Copyright &copy; 2021 EBook Share
				</Typography>
			</Container>
		</footer>
	)
}

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
