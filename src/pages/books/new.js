import { yupResolver } from '@hookform/resolvers/yup'
import { MenuItem } from '@material-ui/core'
import {
	AlertSnackbar,
	SubmitButton,
	HeadTitle,
	AutocompleteController,
	SelectController,
	TextAreaController,
	TextFieldController,
	CenteredContainer,
} from 'common/components'
import { GENRES, USER_ROLES, ACCEPT_FILE_TYPES } from 'common/constants'
import { ADD_BOOK_SCHEMA } from 'common/schema'
import { handleSimpleServiceError } from 'common/utils'
import { addBook } from 'modules/books/api/books.api'
import UploadFile from 'modules/upload/components/UploadFile'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

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
		defaultValues: {},
	})
	const router = useRouter()
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [alertProps, setAlertProps] = useState({
		severity: '',
		message: '',
	})

	async function onSubmit(data) {
		data.slug = slugify(data.name)
		// change array obj -> array int so BE can receive
		data.genres = data.genres.map(item => item.id)

		const res = await addBook(data)
		setAlertProps(handleSimpleServiceError(res))
		setOpenSnackbar(true)
	}

	function onError(data) {}

	function handleCloseSnackbar() {
		setOpenSnackbar(false)
		alertProps.severity === 'success' &&
			router.push(`/books/${slugify(watch('name'))}`)
	}

	return (
		<>
			<HeadTitle page="New book" />

			<CenteredContainer title="New book"  type="form">
				<UploadFile
					name="file"
					label="Upload Book"
					accept={ACCEPT_FILE_TYPES.EBOOK}
					required
					register={register}
					errors={errors}
				/>

				<UploadFile
					name="thumbnail"
					label="Upload Thumbnail"
					accept={ACCEPT_FILE_TYPES.THUMBNAIL}
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
			</CenteredContainer>

			<AlertSnackbar
				open={openSnackbar}
				onClose={handleCloseSnackbar}
				severity={alertProps.severity}
				message={alertProps.message}
			/>
		</>
	)
}

NewBook.auth = true
NewBook.allowedRole = USER_ROLES.store
