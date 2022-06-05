import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from '@material-ui/core'
import { resolvePath } from 'common/utils'
import { useState } from 'react'

export default function TableGrid({
	columns,
	rows,
	showOrdinalNumber = false,
	rowsPerPage = 5,
	rowsPerPageOptions = [5, 10, 15],
	className,
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
		<div className={className}>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{showOrdinalNumber && <TableCell width={50}>No.</TableCell>}

							{columns.map(col => (
								<TableCell key={col.field} width={col.width} align={col.align}>
									{col.headerName || col.field}
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => (
								<>
									<TableRow key={index}>
										{showOrdinalNumber && (
											<TableCell>{page * rowsPerPage + index + 1}</TableCell>
										)}

										{columns.map(col => (
											<TableCell key={col.field} align={col.align}>
												{col?.renderCell ? (
													col.renderCell(resolvePath(row, col.field))
												) : (
													<Typography>{resolvePath(row, col.field)}</Typography>
												)}
											</TableCell>
										))}
									</TableRow>
								</>
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

			<div className="flex justify-end my-small">
				<TablePagination
					count={rows.length}
					page={page}
					rowsPerPage={rowsPerPage}
					rowsPerPageOptions={rowsPerPageOptions}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					component={Paper}
				/>
			</div>
		</div>
	)
}
