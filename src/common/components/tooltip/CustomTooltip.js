import { makeStyles, Tooltip } from '@material-ui/core'
import { Help } from '@material-ui/icons'

export default function CustomTooltip({
	type = 'custom', //helper|action|custom
	theme = 'light',
	icon,
	style,
	children,
	...props
}) {
	const finalTheme = type === 'helper' ? 'dark' : theme

	const useStyles = makeStyles({
		arrow: {
			color: finalTheme === 'dark' ? '#000' : '#fff',
		},

		tooltip: {
			color: finalTheme === 'dark' ? '#fff' : '#000',
			backgroundColor: finalTheme === 'dark' ? '#414141' : '#fff',
			padding: type === 'helper' ? '8px' : 0,
			border: '1px solid rgba(0,0,0,0.1)',
			...style,
		},
	})

	const renderIcon = () => {
		if (icon) return icon

		switch (type) {
			case 'helper':
				return <Help />

			case 'action':
				return <MoreHoriz />

			default:
				return icon
		}
	}

	return (
		<Tooltip
			arrow
			interactive
			classes={useStyles()}
			title={children}
			{...props}
		>
			{renderIcon()}
		</Tooltip>
	)
}
