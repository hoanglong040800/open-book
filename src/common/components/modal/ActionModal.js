import { Fade, IconButton, Modal, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'

export default function ActionModal({ isOpen, title, onClose, children }) {
	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			className="overflow-y-scroll height-full position-absolute flex align-center justify-center"
		>
			<Fade in={isOpen} >
				<div
					className="bg-white shadow-container p-large m-auto outline-none rounded"
					style={{
						maxWidth: 700,
						top: '50%',
					}}
				>
					<div className="flex justify-between align-center mb-large">
						<Typography variant="h5">{title}</Typography>

						<IconButton onClick={onClose} size="small">
							<Close />
						</IconButton>
					</div>

					{children}
				</div>
			</Fade>
		</Modal>
	)
}
