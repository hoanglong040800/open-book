import { toTitleCase } from 'common/utils'

const styleConfig = [
	{
		type: 'form',
		maxWidth: 700,
	},
	{
		type: 'content',
		maxWidth: 1100,
	},
	{
		type: 'full',
		maxWidth: 'auto',
	},
]

export default function CenteredContainer({
	title = '',
	type = 'form',
	gutterBottom = false,
	className = '',
	style,
	children,
}) {
	const customClassName = `${gutterBottom && 'mb-x-large'}`
	const customStyle = styleConfig.find(sc => sc.type == type)

	return (
		<div
			className={`flex flex-column mx-auto py-large px-x3-large shadow-container bg-white 
									${customClassName} ${className}`}
			style={{ ...customStyle, ...style }}
		>
			<h1>{toTitleCase(title)}</h1>
			{children}
		</div>
	)
}
