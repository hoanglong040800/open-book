import { HeadTitle } from 'common/components'
import { USER_ROLES } from 'common/constants'

export default function AddMultiBooks() {
	return (
		<>
			<HeadTitle page="add multi books" />

			<h1>add multi books</h1>
		</>
	)
}

AddMultiBooks.auth = true
AddMultiBooks.allowedRole = USER_ROLES.store
