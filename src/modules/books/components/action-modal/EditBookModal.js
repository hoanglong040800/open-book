import { yupResolver } from '@hookform/resolvers/yup'
import { MenuItem } from '@material-ui/core'
import {
	ActionModal,
	FooterButtons,
	SelectController,
	TextAreaController,
	TextFieldController,
} from 'common/components'
import { ADD_FAILED_BOOK_SCHEMA } from 'common/schema'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function EditBookModal({
	isOpen,
	onSubmit,
	onClose,
	selectedBook,
}) {
	const {
		control,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm({
		resolver: yupResolver(ADD_FAILED_BOOK_SCHEMA),
	})

	useEffect(() => {
		if (isOpen) {
			reset(selectedBook)
		}
	}, [isOpen])

	function onError(err) {
		throw err
	}

	function _onSubmit(data) {
		onSubmit(data)
		onClose()
	}

	return (
		<ActionModal title="Re-add Book" isOpen={isOpen} onClose={onClose}>
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
				<MenuItem value="EN">English</MenuItem>
				<MenuItem value="VN">Vietnamese</MenuItem>
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

			<FooterButtons
				text="Add"
				onClick={handleSubmit(_onSubmit, onError)}
				textSecondary="Cancel"
				onSecondaryClick={onClose}
			/>
		</ActionModal>
	)
}
