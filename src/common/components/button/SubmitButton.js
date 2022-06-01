import { Box, Button, CircularProgress } from '@material-ui/core'

export default function SubmitButton({
	text = 'Submit',
	onClick,
	textSecondary,
	onSecondaryClick,
	isLoading = false,
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
		<Box display="flex" justifyContent="flex-end" mt={3} my={2}>
			{textSecondary && (
				<Button
					variant="contained"
					onClick={onSecondaryClick}
					disabled={isLoading}
					className="mr-medium"
				>
					{renderButtonContent(textSecondary)}
				</Button>
			)}

			<Button
				variant="contained"
				color="primary"
				onClick={onClick}
				disable={isLoading}
			>
				{renderButtonContent(text)}
			</Button>
		</Box>
	)
}
