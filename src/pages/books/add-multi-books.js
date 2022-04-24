import { HeadTitle, SubmitButton } from 'common/components'
import { URL_UPLOAD_MULTI_FILES, USER_ROLES } from 'common/constants'
import { FormLayout } from 'common/layouts'
import Link from 'next/link'

export default function AddMultiBooks() {
	function handleUploadFile() {}

	function convertExcelToCsv() {}

	function handleSubmit() {}

	return (
		<>
			<HeadTitle page="add multi books" />

			<FormLayout title="add multi books">
				<div style={styles.description}>
					<p>
						Upload your excel or csv file contains basic information and links,
						Open Book will generate genres automatically and add all ebooks for
						you in a single click!
					</p>

					<p>
						Please make sure you have image & pdf links before uploading. If
						not,{' '}
						<Link href={URL_UPLOAD_MULTI_FILES}>
							<a style={styles.link}>
								click here to upload and retrieve links!
							</a>
						</Link>
					</p>
				</div>

				<input
					required
					type="file"
					accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					onChange={handleUploadFile}
				/>

				<p>Accept .xlsx .csv</p>

				<SubmitButton text="Submit" onClick={handleSubmit} />
			</FormLayout>
		</>
	)
}

const styles = {
	link: {
		color: 'blue',
	},

	description: {
		marginBottom: 30,
	},
}

AddMultiBooks.auth = true
AddMultiBooks.allowedRole = USER_ROLES.store
