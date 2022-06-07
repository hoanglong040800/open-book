import { Box, Button, CircularProgress } from '@material-ui/core'

export default function FooterButtons({
	text = 'Submit',
	onClick,
	primaryDisabled = false,
	textSecondary,
	onSecondaryClick,
	secondaryDisabled = false,
	isLoading = false,
	className,
}) {
	function renderButtonContent(content) {
		return (
			<div className="flex align-center gap-medium">
				{isLoading && (
					<div className="text-white flex-1 flex align-center">
						<CircularProgress size={15} color="inherit" />
					</div>
				)}
				{content}
			</div>
		)
	}

	return (
		<Box className={`flex justify-end mt-large ${className}`}>
			{textSecondary && (
				<Button
					onClick={onSecondaryClick}
					disabled={isLoading || secondaryDisabled}
					className="mr-medium"
				>
					{renderButtonContent(textSecondary)}
				</Button>
			)}

			<Button
				variant="contained"
				color="primary"
				onClick={onClick}
				disabled={isLoading || primaryDisabled}
			>
				{renderButtonContent(text)}
			</Button>
		</Box>
	)
}
