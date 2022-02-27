import { yupResolver } from '@hookform/resolvers/yup'
import { MenuItem } from '@material-ui/core'
import AlertSnackbar from 'common/components/alertsnackbar/AlertSnackbar'
import SubmitButton from 'common/components/button/SubmitButton'
import HeadTitle from 'common/components/headtitle/HeadTitle'
import AutocompleteController from 'common/components/input/AutocompleteController'
import SelectController from 'common/components/input/SelectController'
import TextAreaController from 'common/components/input/TextAreaController'
import TextFieldController from 'common/components/input/TextFieldController'
import { GENRES, USER_ROLES } from 'common/constants/common.constant'
import FormLayout from 'common/layouts/FormLayout'
import { ADD_BOOK_SCHEMA } from 'common/schema/form-validation.schema'
import { handleSimpleServiceError } from 'common/utils/common.util'
import { addBook } from 'modules/books/api/books.api'
import UploadFile from 'modules/upload/components/UploadFile'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx)

	if (session.user.role === USER_ROLES.viewer)
		return {
			notFound: true,
		}

	return {
		props: {
			session,
		},
	}
}

export default function NewBook({ session }) {
	const {
		register,
		watch,
		control,
		formState: { errors },
		setValue,
		handleSubmit,
	} = useForm({
		resolver: yupResolver(ADD_BOOK_SCHEMA),
		defaultValues: {
			name: 'Alice in Wonderland',
			authors: 'Billy Jeans',
			genres: [
				{
					id: 1,
					name_en: 'Life',
				},
				{
					id: 2,
					name_en: 'Business',
				},
			],
			publisher: 'some publisher',
			published_year: 100,
			language: 'en',
			pages: 250,
			summary: 'Some awesome\nsummary',
		},
	})
	const router = useRouter()
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [alertProps, setAlertProps] = useState({
		severity: '',
		message: '',
	})

	async function onSubmit(data) {
		data.slug = slugify(data.name)
		const res = await addBook(data)
		setAlertProps(handleSimpleServiceError(res))
		setOpenSnackbar(true)
	}

	function onError(error) {
	}

	function handleCloseSnackbar() {
		setOpenSnackbar(false)
		alertProps.severity === 'success' &&
			router.push(`/books/${slugify(watch('name'))}`)
	}

	return (
		<>
			<HeadTitle page="New book" />

			<FormLayout title="New book">
				<UploadFile
					name="file"
					label="Upload Book"
					accept=".pdf"
					required
					register={register}
					errors={errors}
				/>

				<UploadFile
					name="thumbnail"
					label="Upload Thumbnail"
					accept="image/png, image/gif, image/jpeg"
					required
					register={register}
					errors={errors}
				/>

				<TextFieldController
					name="name"
					label="Name"
					required
					control={control}
					errors={errors}
				/>

				<TextFieldController
					name="authors"
					label="Authors"
					required
					control={control}
					errors={errors}
				/>

				<AutocompleteController
					name="genres"
					label="Genres"
					options={GENRES}
					optionLabel="name_en"
					defaultValue={GENRES}
					required
					setValue={setValue}
					control={control}
					errors={errors}
				/>

				<TextFieldController
					name="publisher"
					label="Publisher"
					control={control}
					errors={errors}
				/>

				<TextFieldController
					name="published_year"
					label="Published Year"
					type="number"
					control={control}
					errors={errors}
				/>

				<SelectController
					name="language"
					label="Language"
					control={control}
					errors={errors}
				>
					<MenuItem value="en">English</MenuItem>
					<MenuItem value="vn">Vietnamese</MenuItem>
				</SelectController>

				<TextFieldController
					name="pages"
					label="Pages"
					type="number"
					control={control}
					errors={errors}
				/>

				<TextAreaController
					name="summary"
					label="Summary"
					control={control}
					errors={errors}
				/>

				<SubmitButton text="Add" onClick={handleSubmit(onSubmit, onError)} />
			</FormLayout>

			<AlertSnackbar
				open={openSnackbar}
				onClose={handleCloseSnackbar}
				severity={alertProps.severity}
				message={alertProps.message}
			/>
		</>
	)
}
