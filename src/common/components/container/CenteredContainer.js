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
]

export default function CenteredContainer({
	title = '',
	type = 'form',
	customStyleConfig,
	children,
}) {
	let finalStyleConfig = styleConfig.find(sc => (sc.type = type))
	finalStyleConfig = { ...finalStyleConfig, ...customStyleConfig }

	console.log(finalStyleConfig)

	return (
		<div
			className="flex flex-column mx-auto py-large px-x3-large shadow-container bg-white"
			style={{ maxWidth: finalStyleConfig.maxWidth }}
		>
			<h1>{toTitleCase(title)}</h1>

			{children}
		</div>
	)
}
