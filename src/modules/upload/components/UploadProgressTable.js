import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	LinearProgress,
	IconButton,
} from '@material-ui/core'
import { FileCopyOutlined } from '@material-ui/icons'

export default function UploadProgressTable({
	selectedFiles,
	handleCopyLinksToClipboard,
}) {
	const tableWidth = {
		index: 50,
		name: 250,
		linkStorage: 600,
		percentCompleted: 'auto',
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell width={tableWidth.index}>Index</TableCell>

							<TableCell width={tableWidth.name}>File name</TableCell>

							<TableCell width={tableWidth.linkStorage}>
								Link
								<IconButton
									size="small"
									onClick={handleCopyLinksToClipboard}
									className="ml-small"
								>
									<FileCopyOutlined fontSize="small" />
								</IconButton>
							</TableCell>

							<TableCell width={tableWidth.percentCompleted}>
								Percent Completed
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{
							//
							selectedFiles.map((file, index) => (
								<TableRow key={index}>
									<TableCell align="center">{index + 1}</TableCell>

									<TableCell>{file.name}</TableCell>

									<TableCell>{file.linkStorage}</TableCell>

									<TableCell>
										{file.percentCompleted !== 0 && (
											<>
												<LinearProgress
													variant="determinate"
													value={file.percentCompleted}
												/>

												<p className="text-align-right mt-x-small">
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
