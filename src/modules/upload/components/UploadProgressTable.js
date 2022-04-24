import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	LinearProgress,
} from '@material-ui/core'

export default function UploadProgressTable({ selectedFiles }) {
	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell width={50}>Index</TableCell>

							<TableCell width={300}>File names</TableCell>

							<TableCell width={500}>Link</TableCell>

							<TableCell>Percent Completed</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{
							//
							selectedFiles.map((file, index) => (
								<TableRow key={index}>
									<TableCell align="center">{index + 1}</TableCell>

									<TableCell>{file.name}</TableCell>

									<TableCell>{file.link_storage}</TableCell>

									<TableCell>
										{file.percentCompleted !== 0 && (
											<>
												<LinearProgress
													variant="determinate"
													value={file.percentCompleted}
												/>

												<p style={styles.progressLabel}>
													{file.percentCompleted}%
												</p>
											</>
										)}
									</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

const styles = {
	progressLabel: {
		textAlign: 'right',
		margin: '5px 0 0 0',
	},
}
