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
import { EDIT_BOOK_SCHEMA } from 'common/schema/form-validation.schema'
import { handleSimpleServiceError } from 'common/utils/common.util'
import { getBookById, updateBookInfo } from 'modules/books/api/books.api'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx)
	const isEditor = session.user.role === USER_ROLES.viewer

	if (isEditor)
		return {
			notFound: true,
		}

	return {
		props: {
			slug: ctx.query.slug,
			session,
		},
	}
}

export default function NewBook({ slug, session }) {
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
	const [bookInfo, setBookInfo] = useState()
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [alertProps, setAlertProps] = useState({
		severity: '',
		message: '',
	})

	useEffect(() => {
		async function getBookInfo() {
			const res = await getBookById(slug)
			setBookInfo(res.data)
			reset(res.data)
		}

		getBookInfo()
	}, [])

	// -- function --

	async function onSubmit(data) {
		data.slug = slugify(data.name)
		const res = await updateBookInfo(bookInfo.owner_id, data)
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

	// -- render --

	return (
		<>
			<HeadTitle page="Edit book" />

			<FormLayout title="Edit book">
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

				<SubmitButton text="Edit" onClick={handleSubmit(onSubmit, onError)} />
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
