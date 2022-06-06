import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import { MenuItem } from '@material-ui/core'
import {
	AlertSnackbar,
	FooterButtons,
	HeadTitle,
	AutocompleteController,
	SelectController,
	TextAreaController,
	TextFieldController,
	CenteredContainer,
} from 'common/components'
import { GENRES, USER_ROLES } from 'common/constants'
import { EDIT_BOOK_SCHEMA } from 'common/schema'
import { handleSimpleServiceError } from 'common/utils'
import { getBookBySlug, updateBookInfo } from 'modules/books/api'

export async function getServerSideProps(ctx) {
	return {
		props: {
			slug: ctx.query.slug,
		},
	}
}

export default function EditBook({ slug, session }) {
	const {
		watch,
		reset,
		control,
		formState: { errors },
		setValue,
		handleSubmit,
	} = useForm({
		resolver: yupResolver(EDIT_BOOK_SCHEMA),
		defaultValues: {},
	})
	const router = useRouter()
	const [bookInfo, setBookInfo] = useState(null)
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [alertProps, setAlertProps] = useState({
		severity: '',
		message: '',
	})

	useEffect(() => {
		async function getBookInfo() {
			const data = await getBookBySlug(slug)
			setBookInfo(data)
			reset(data)
		}

		getBookInfo()
	}, [])

	async function onSubmit(data) {
		data.slug = slugify(data.name)
		// change array obj -> array int so BE can receive
		data.genres = data.genres.map(item => item.id)

		const res = await updateBookInfo(bookInfo.owner_id, data)
		setAlertProps(handleSimpleServiceError(res))
		setOpenSnackbar(true)
	}

	function onError(error) {}

	function handleCloseSnackbar() {
		setOpenSnackbar(false)
		alertProps.severity === 'success' &&
			router.push(`/books/${slugify(watch('name'))}`)
	}

	return (
		<>
			<HeadTitle page="Edit book" />

			{bookInfo && (
				<CenteredContainer title="Edit book"  type="form">
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
						defaultValue={bookInfo.genres}
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

					<FooterButtons text="Edit" onClick={handleSubmit(onSubmit, onError)} />
				</CenteredContainer>
			)}

			<AlertSnackbar
				open={openSnackbar}
				onClose={handleCloseSnackbar}
				severity={alertProps.severity}
				message={alertProps.message}
			/>
		</>
	)
}

EditBook.auth = true
EditBook.allowedRole = USER_ROLES.store
