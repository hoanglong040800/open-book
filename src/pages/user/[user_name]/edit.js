import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, MenuItem } from "@material-ui/core";
import AlertSnackbar from "common/components/alertsnackbar/AlertSnackbar";
import HeadTitle from "common/components/headtitle/HeadTitle";
import SelectController from "common/components/input/SelectController";
import TextFieldController from "common/components/input/TextFieldController";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUserProfile, updateUserProfile } from 'modules/users/api/users.api'
import Loading from 'common/components/loading/Loading'
import { COMMON_ALERT } from "common/constants/alert.constant";

export default function EditProfile() {
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      full_name: 'Viewer',
      gender: 'male',
    }
  });

  const [profile, setProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    severity: "",
    message: "",
  });

  useEffect(async () => {
    setIsLoading(true)
    const data = await getUserProfile()
    setProfile(data)

    setIsLoading(false)
  }, [])

  function handleCloseSnackbar() {
    setOpenSnackbar(false);
  }

  async function onSubmit(input) {
    console.clear()
    const res = await updateUserProfile('viewer', input)

    setSnackbarProps(
      res ? COMMON_ALERT.success : COMMON_ALERT.error
    )

    setOpenSnackbar(true);
  }

  function onError(error) { }

  return (
    <>
      <HeadTitle page="edit profile" />


      {
        isLoading ? <Loading /> : <Box display="flex" flexDirection="column" mx="auto" maxWidth="500px">
          <h1>Edit profile</h1>

          <TextFieldController
            name="full_name"
            label="Full name"
            defaultValue={profile?.full_name}
            required
            control={control}
            errors={errors}
          />

          <SelectController
            name="gender"
            label="Gender"
            defaultValue={profile?.gender}
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
      }

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
