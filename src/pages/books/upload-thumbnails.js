import { HeadTitle } from 'common/components'
import { USER_ROLES } from 'common/constants'

export default function UploadThumbnails() {
	return (
		<>
			<HeadTitle page="add multi books" />

			<h1>upload thumbnails</h1>
		</>
	)
}

UploadThumbnails.auth = true
UploadThumbnails.allowedRole = USER_ROLES.store
