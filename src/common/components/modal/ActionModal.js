import { IconButton, Modal, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'

export default function ActionModal({ isOpen, title, onClose, children }) {
	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			className="overflow-y-scroll height-full flex align-center justify-center"
		>
			<div
				className="bg-white shadow-container p-large outline-none rounded"
				style={{
					maxWidth: 700,
				}}
			>
				<div className="flex justify-between align-center mb-large">
					<Typography variant="h5">
						{title}
					</Typography>

					<IconButton onClick={onClose} size="small">
						<Close />
					</IconButton>
				</div>

				{children}
			</div>
		</Modal>
	)
}
