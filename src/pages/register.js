import { yupResolver } from '@hookform/resolvers/yup'
import AlertSnackbar from 'common/components/alertsnackbar/AlertSnackbar'
import SubmitButton from 'common/components/button/SubmitButton'
import HeadTitle from 'common/components/headtitle/HeadTitle'
import TextFieldController from 'common/components/input/TextFieldController'
import { COMMON_ALERT, REGISTER_ALERT } from 'common/constants/alert.constant'
import { CALLBACK_REGISTER } from 'common/constants/url.constant'
import FormLayout from 'common/layouts/FormLayout'
import { REGISTER_SCHEMA } from 'common/schema/form-validation.schema'
import { fetchRegister } from 'modules/auth/api/auth.api'
import { getSession, signin, signIn } from 'next-auth/client'
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
    },
  }
}

export default function Register() {
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(REGISTER_SCHEMA),
    defaultValues: {
      user_name: 'user1',
      password: '1',
      password_confirmation: '1',
    },
  })

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarProps, setSnackbarProps] = useState({
    severity: '',
    message: '',
  })

  async function onSubmit(credentials) {
    const res = await fetchRegister(credentials)

    setSnackbarProps(
      res.status === 200
        ? REGISTER_ALERT.success
        : res.status === 503
          ? COMMON_ALERT.internet
          : res.message.includes('exists')
            ? REGISTER_ALERT.duplicate
            : COMMON_ALERT.error
    )
    setOpenSnackbar(true)
  }

  function onError(error) {
    console.clear()
    console.log(error)
  }

  function handleCloseSnackbar() {
    if (snackbarProps.severity === 'success') {
      signIn('credentials', {
        user_name: watch('user_name'),
        password: watch('password'),
        redirect: true,
        callbackUrl: `/`,
      })
    }

    setOpenSnackbar(false)
  }

  return (
    <>
      <HeadTitle page='register' />

      <FormLayout title='register'>
        <TextFieldController
          name="user_name"
          label="Username"
          required
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="email"
          label="Email"
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

        <SubmitButton
          text="Register"
          onClick={handleSubmit(onSubmit, onError)}
        />
      </FormLayout>

      <AlertSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity={snackbarProps.severity}
        message={snackbarProps.message}
      />
    </>
  )
}
