import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@material-ui/core'
import { Create, DeleteOutline } from '@material-ui/icons'
import SubmitButton from 'common/components/button/SubmitButton'
import { useState } from 'react'

export default function BooksManageTable({
	rows,
	rowsPerPage = 5,
	onEditClick,
	onDeleteClick,
}) {
	const [page, setPage] = useState(0)
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

	function handleChangePage(event, newPage) {
		setPage(newPage)
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell width={300}>Name</TableCell>
							<TableCell width={200} align="left">
								Authors
							</TableCell>
							<TableCell width={150} align="center">
								Published Year
							</TableCell>
							<TableCell width={300} align="left">
								Genres
							</TableCell>
							<TableCell width={100} align="center">
								Views
							</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(row => (
								<TableRow key={row.id}>
									<TableCell component="th" align="left">
										{row.name}
									</TableCell>

									<TableCell align="left">{row.authors}</TableCell>

									<TableCell align="center">{row.published_year}</TableCell>

									<TableCell align="left">
										{/* todo uncomment */}
										{/* {row.genres.map(genre => genre.name_en).join(', ')} */}
									</TableCell>

									<TableCell align="center">{row.view}</TableCell>

									<TableCell align="center">
										<div style={style.buttonsWrapper}>
											<IconButton
												size="small"
												color="primary"
												onClick={() => onEditClick(row.slug)}
											>
												<Create fontSize="small" color="primary" />
											</IconButton>

											<IconButton
												size="small"
												color="secondary"
												onClick={() => onDeleteClick(row)}
											>
												<DeleteOutline fontSize="small" color="secondary" />
											</IconButton>
										</div>
									</TableCell>
								</TableRow>
							))}

						{/* display empty rows */}
						{emptyRows > 0 && (
							<TableRow style={{ height: 49.27 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<div style={style.pagination}>
				<TablePagination
					count={rows.length}
					page={page}
					rowsPerPage={5}
					rowsPerPageOptions={[5, 10, 15]}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					component={Paper}
				/>
			</div>
		</>
	)
}

const style = {
	pagination: {
		display: 'flex',
		justifyContent: 'flex-end',
		margin: '10px 0',
	},

	buttonsWrapper: {
		display: 'flex',
		gap: 10,
		alignItem: 'center',
		justifyContent: 'center',
	},
}
