import { toTitleCase } from 'common/utils'

export default function FormContainer({
	title = '',
	maxWidth = 500,
	children,
}) {
	return (
		<div
			className="flex flex-column mx-auto p-x2-large shadow-container hover-shadow-box"
			style={{ maxWidth: maxWidth }}
		>
			<h1>{toTitleCase(title)}</h1>

			{children}
		</div>
	)
}
