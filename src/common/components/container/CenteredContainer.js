import { toTitleCase } from 'common/utils'

const styleConfig = [
	{
		type: 'form',
		maxWidth: 700,
	},
	{
		type: 'content',
		maxWidth: 1000,
		marginBottom: 24,
	},
	{
		type: 'full',
		maxWidth: 'auto',
		marginBottom: 24,
	},
]

export default function CenteredContainer({
	title = '',
	type = 'full',
	className = '',
	style,
	children,
}) {
	const customStyle = styleConfig.find(sc => sc.type == type)

	return (
		<div
			className={`flex flex-column mx-auto py-large px-x3-large shadow-container bg-white ${className}`}
			style={{ ...customStyle, ...style }}
		>
			{title && <h1 className="mt-none">{toTitleCase(title)}</h1>}
			{children}
		</div>
	)
}
