import { Box, Button } from '@material-ui/core'

export default function SubmitButton({
	text = 'Submit',
	onClick,
	textSecondary,
	onSecondaryClick,
}) {
	return (
		<Box display="flex" justifyContent="flex-end" mt={3} my={2}>
			{textSecondary && (
				<Button variant="contained" onClick={onSecondaryClick} style={styles.secondary}>
					{textSecondary}
				</Button>
			)}

			<Button variant="contained" color="primary" onClick={onClick}>
				{text}
			</Button>
		</Box>
	)
}

const styles={
	secondary:{
		marginRight: '10px'
	}
}
