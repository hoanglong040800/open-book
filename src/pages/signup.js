import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@material-ui/core'
import AlertSnackbar from 'common/components/alertsnackbar/AlertSnackbar'
import TextFieldController from 'common/components/input/TextFieldController'
import { alertSignUp } from 'common/constants/alert.constant'
import { CALLBACK_SIGNUP } from 'common/constants/url.constant'
import { signupSchema } from 'common/schema/form-validation.schema'
import { fetchSignup } from 'modules/auth/api/auth.api'
import { getSession, signIn } from 'next-auth/client'
import Head from 'next/head'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return {
    props: {
      apiUrl: process.env.API_URL,
      nextauthUrl: process.env.NEXTAUTH_URL,
    },
  }
}

export default function SignUp({ apiUrl, nextauthUrl }) {
  const {
    watch,
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {

    },
  })

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarProps, setSnackbarProps] = useState({
    severity: '',
    message: '',
  })

  function handleCloseSnackbar() {
    setOpenSnackbar(false)

    if (snackbarProps.severity === 'success') {
      signIn('credentials', {
        email: watch('email'),
        password: watch('password'),
        redirect: true,
        callbackUrl: `${CALLBACK_SIGNUP}`,
      })
    }
  }

  async function onSubmit(data) {
    const res = await fetchSignup(apiUrl, data)

    res.status
      ? setSnackbarProps(alertSignUp.success)
      : res.message.includes('duplicate')
        ? setSnackbarProps(alertSignUp.duplicate)
        : setSnackbarProps(alertSignUp.error)

    setOpenSnackbar(true)
  }

  function onError(error) {

  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <Box display="flex" flexDirection="column" mx="auto" maxWidth="500px">
        <h1>Sign Up</h1>

        <TextFieldController
          name="email"
          label="Email"
          required
          type="email"
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="user_name"
          label="Username"
          required
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="password"
          label="Password"
          required
          // type="password"
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="password_confirmation"
          label="Password Confirmation"
          required
          // type="password"
          control={control}
          errors={errors}
        />

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit, onError)}
          >
            Sign Up
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
  )
}
