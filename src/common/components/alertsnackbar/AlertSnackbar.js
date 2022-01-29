import { Slide, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

export default function AlertSnackbar({
  open,
  onClose,
  severity,
  message,
}) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={2500}
      TransitionComponent={Slide}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}
