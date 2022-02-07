import { FormControl, InputLabel, Select } from "@material-ui/core";
import { Controller } from "react-hook-form";

export default function SelectController({
  name,
  label,
  control,
  errors,
  children,
  defaultValue = "",
  required = false,
}) {
  return (
    <FormControl
      margin="normal"
      fullWidth
      required={required}
      error={!!errors[name]}
    >
      <InputLabel>{label}</InputLabel>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => <Select {...field}>{children}</Select>}
      />
    </FormControl>
  );
}
