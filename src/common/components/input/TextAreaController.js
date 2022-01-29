import { FormControl, TextField } from '@material-ui/core'
import { Controller } from 'react-hook-form'

export default function TextAreaController({
  name,
  label,
  control,
  errors,
  defaultValue = '',
}) {
  return (
    <FormControl margin="normal" fullWidth>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            multiline
            variant='outlined'
            minRows={5}
            maxRows={15}
          />
        )}
      />
    </FormControl>
  )
}
