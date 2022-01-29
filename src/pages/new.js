import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, MenuItem, Slide, Snackbar } from '@material-ui/core'
import AutocompleteController from 'common/components/input/AutocompleteController'
import SelectController from 'common/components/input/SelectController'
import TextAreaController from 'common/components/input/TextAreaController'
import TextFieldController from 'common/components/input/TextFieldController'
import { thesisSchema } from 'common/schema/form-validation.schema'
import { fetchAllFaculties, fetchAllTags } from 'modules/fetch-common'
import { addFile, addThesisInfor } from 'modules/theses/fetch-theses'
import UploadPDF from 'modules/theses/pdf/UploadPDF'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import { getSession } from 'next-auth/client'
import { Alert } from '@material-ui/lab'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getNameFromEmail } from 'common/utils/common.util'

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const tagsOptions = await fetchAllTags(process.env.API_URL)
  const facultiesOptions = await fetchAllFaculties(process.env.API_URL)

  if (tagsOptions === false || facultiesOptions === false) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      tagsOptions,
      session,
      facultiesOptions,
      apiUrl: process.env.API_URL,
    },
  }
}

export default function NewThesis({
  apiUrl,
  session,
  tagsOptions,
  facultiesOptions,
}) {
  const {
    watch,
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(thesisSchema),
    defaultValues:{
      format: 'PDF'
    }
  })

  const router = useRouter()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [severity, setSeverity] = useState('success')

  // Snackbar
  function handleCloseSnackbar() {
    setOpenSnackbar(false)

    if (severity === 'success') {
      const slug = slugify(watch('name'))
      const nameEmail = getNameFromEmail(session.user.email)

      reset('', {
        keepValues: false,
      })

      router.push(`/${nameEmail}/${slug}`)
    }
  }

  async function onSubmit(data) {
    data['slug'] = slugify(data['name'])

    // add infor
    const thesis_id = await addThesisInfor(apiUrl, data, session.user.id)
    if (!thesis_id) {
      setSeverity('error')
      setOpenSnackbar(true)
      return
    }

    // add file
    const status = await addFile(
      apiUrl,
      data.file[0],
      session.user.id,
      thesis_id
    )

    if (status) setSeverity('success')
    else setSeverity('error')

    setOpenSnackbar(true)
  }

  function onError(err) {
    console.log('ERROR\n', err)
  }

  return (
    <>
      <Head>
        <title>Thêm luận văn mới</title>
      </Head>

      <Box display="flex" flexDirection="column" mx="auto" maxWidth="500px">
        <UploadPDF name="file" register={register} errors={errors} />

        <TextFieldController
          name="name"
          label="Tên luận văn"
          required
          control={control}
          errors={errors}
        />

        <SelectController
          name="faculty_id"
          label="Khoa"
          required
          control={control}
          errors={errors}
        >
          {facultiesOptions.slice(1).map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.name_vn}
            </MenuItem>
          ))}
        </SelectController>

        <TextFieldController
          name="published_year"
          label="Năm"
          type="number"
          required
          control={control}
          errors={errors}
        />

        <SelectController
          name="type"
          label="Loại luận văn"
          required
          control={control}
          errors={errors}
        >
          <MenuItem value="KLTN">Khóa luận tốt nghiệp</MenuItem>
          <MenuItem value="ĐACN">Đồ án chuyên ngành</MenuItem>
        </SelectController>

        <Box mt={2}>
          <AutocompleteController
            name="tags"
            label="Tags"
            options={tagsOptions}
            optionLabel="name_vn"
            required
            control={control}
            errors={errors}
            setValue={setValue}
          />
        </Box>

        <SelectController
          name="format"
          label="Định dạng"
          control={control}
          errors={errors}
        >
          <MenuItem value="PDF">PDF</MenuItem>
        </SelectController>

        <SelectController
          name="language"
          label="Ngôn ngữ"
          control={control}
          errors={errors}
        >
          <MenuItem value="VN">Tiếng Việt</MenuItem>
          <MenuItem value="EN">Tiếng Anh</MenuItem>
        </SelectController>

        <TextFieldController
          name="authors"
          label="Tác giả"
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="teachers"
          label="Giảng viên hướng dẫn"
          control={control}
          errors={errors}
        />

<TextAreaController
          name='abstract'
          label='Tổng quan'
          control={control}
          errors={errors}
        />

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit, onError)}
          >
            Đăng
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={2500}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {severity === 'success'
            ? 'Thêm luận văn thành công. Đang điều hướng đến trang chi tiết'
            : 'Có lỗi xảy ra khi thêm luận văn mới. Vui lòng thử lại lần sau.'}
        </Alert>
      </Snackbar>
    </>
  )
}

NewThesis.auth = true
