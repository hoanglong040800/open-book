import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@material-ui/core'
import { useState } from 'react'

export default function TableGrid({
	title = '',
	columns,
	rows,
	showOrdinalNumber = false,
	rowsPerPage = 5,
	rowsPerPageOptions = [5, 10, 15],
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
			<h2 className="text-align-center">{title}</h2>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{/* ordinal number */}
							{showOrdinalNumber && <TableCell width={50}>No.</TableCell>}

							{columns.map(col => (
								<TableCell key={col.field} width={col.width}>
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
										{/* ordinal number */}
										{showOrdinalNumber && (
											<TableCell>{page * rowsPerPage + index + 1}</TableCell>
										)}

										{columns.map(col => (
											<TableCell key={col.field}>
												{col?.renderCell
													? col.renderCell(row[col.field])
													: row[col.field]}
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

			<div className="flex justify-end mv-small">
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
		</>
	)
}
