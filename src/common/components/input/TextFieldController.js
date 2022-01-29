import { FormControl, TextField } from '@material-ui/core'
import { Controller } from 'react-hook-form'

export default function TextFieldController({
  name,
  label,
  control,
  errors,
  required = false,
  defaultValue = '',
  type = 'text',
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
            type={type}
            label={label}
            required={required}
            error={!!errors[name]}
            helperText={errors[name]?.message}
          />
        )}
      />
    </FormControl>
  )
}
