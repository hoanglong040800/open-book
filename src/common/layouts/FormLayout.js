import { Box } from '@material-ui/core'
import { toTitleCase } from 'common/utils/common.util'

export default function FormLayout({ title='', maxWidth = 500, children }) {
	return (
		<Box display="flex" flexDirection="column" mx="auto" maxWidth={maxWidth}>
			<h1>{toTitleCase(title)}</h1>

			{children}
		</Box>
	)
}
