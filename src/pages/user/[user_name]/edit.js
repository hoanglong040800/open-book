import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, MenuItem } from "@material-ui/core";
import AlertSnackbar from "common/components/alertsnackbar/AlertSnackbar";
import HeadTitle from "common/components/headtitle/HeadTitle";
import SelectController from "common/components/input/SelectController";
import TextAreaController from "common/components/input/TextAreaController";
import TextFieldController from "common/components/input/TextFieldController";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditProfile({}) {
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {},
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    severity: "",
    message: "",
  });

  function handleCloseSnackbar() {
    setOpenSnackbar(false);
  }

  function onSubmit(input) {
    console.log(input);
    setSnackbarProps({
      severity: "success",
      message: "Edit success",
    });

    setOpenSnackbar(true);
  }

  function onError(error) {}

  return (
    <>
      <HeadTitle page="edit profile" />

      <Box display="flex" flexDirection="column" mx="auto" maxWidth="500px">
        <h1>Edit profile</h1>

        <TextFieldController
          name="full_name"
          label="Full name"
          required
          control={control}
          errors={errors}
        />

        <SelectController
          name="gender"
          label="Gender"
          control={control}
          errors={errors}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </SelectController>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit, onError)}
          >
            Save
          </Button>
        </Box>
      </Box>

      <AlertSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity={snackbarProps.severity}
        message={snackbarProps.message}
      />
    </>
  );
}

EditProfile.auth = true;
