import HeadTitle from 'common/components/headtitle/HeadTitle'
import { USER_ROLES } from 'common/constants/common.constant'

export default function Dashboard({}) {
	return (
		<>
			<HeadTitle page="Store Dashboard" />

			
		</>
	)
}

Dashboard.auth = true
Dashboard.allowedRole = USER_ROLES.store
