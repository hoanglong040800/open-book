import { Box, InputLabel } from '@material-ui/core'

export default function UploadFile({ name, label, required = false, accept, register, errors }) {
  return (
    <Box display="flex" flexDirection="column" mx="auto" my={2}>
      <InputLabel
        error={!!errors[name]} // convert truthy falsy to bool
        style={{ margin: '0 0 15px 0' }}
        required={required}
      >
        {label}
      </InputLabel>

      <input {...register(name)} accept={accept} type="file" />

      <p style={{ color: '#ef5350' }}>{errors[name]?.message}</p>
    </Box>
  )
}