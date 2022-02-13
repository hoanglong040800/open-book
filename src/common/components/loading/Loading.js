import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core'

export default function Loading({ text = 'Loading', theme = 'light' }) {
  const mui = useStyles()

  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={5}>
      <Box mr={3} color={theme === 'light' ? '#333' : '#fff'}>
        <Typography className={mui.typo}>{text}</Typography>
      </Box>

      <CircularProgress color={theme === 'light' ? 'primary' : 'secondary'} />
    </Box>
  )
}

const useStyles = makeStyles({
  typo: {
    fontWeight: 500,
    fontSize: '1rem',
  },
})
