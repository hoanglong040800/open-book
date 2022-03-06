import { Box, Button, makeStyles } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import Loading from 'common/components/loading/Loading'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default function PdfViewer({ file, scrollable = true }) {
	const mui = useStyles()
	const [numPages, setNumPages] = useState(null)
	const [page, setPage] = useState(1)

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages)
	}

	function handleChangePage(payload) {
		let nextPage = page + payload

		if (nextPage < 1 || nextPage > numPages) {
			return
		}

		setPage(nextPage)
	}

	function handleKeyDown(e) {
		e = e || window.event
		switch (e.keyCode) {
			case 37:
				handleChangePage(-1)
				break

			case 39:
				handleChangePage(1)
				break

			default:
				break
		}
	}

	const errorComponent = (
		<Box display="flex" justifyContent="center" py={15}>
			<Alert severity="error">
				<AlertTitle>Error</AlertTitle>
				Load document failed
			</Alert>
		</Box>
	)

	const paginationComponent = (
		<Box display="flex" justifyContent="center" my={3}>
			<Button
				variant="contained"
				className={mui.btn}
				onClick={() => handleChangePage(-1)}
				disabled={page === 1}
			>
				Previous
			</Button>

			<p>
				Page {page} of {numPages}
			</p>

			<Button
				variant="contained"
				className={mui.btn}
				onClick={() => handleChangePage(1)}
				disabled={page === numPages}
			>
				Next
			</Button>
		</Box>
	)

	return (
		<>
			{!scrollable && paginationComponent}

			<Box my={5} onKeyDown={handleKeyDown} tabIndex="0">
				<Document
					file={file}
					onLoadSuccess={onDocumentLoadSuccess}
					loading={<Loading />}
					error={errorComponent}
					onLoadError={console.error}
					renderMode="canvas"
				>
					<Box display="flex" justifyContent="center">
						<Box>
							{
								//
								scrollable ? (
									[...Array(numPages)].map((e, i) => (
										<Page pageNumber={i + 1} key={i + 1} className={mui.page} />
									))
								) : (
									<Page pageNumber={page} className={mui.page} />
								)
							}
						</Box>
					</Box>
				</Document>
			</Box>

			{!scrollable && paginationComponent}
		</>
	)
}

const useStyles = makeStyles(theme => ({
	page: {
		'& .react-pdf__Page__canvas': {
			width: '900px !important',
			height: 'auto !important',
			margin: '20px 0',
		},
	},

	btn: {
		margin: '0 20px',
	},

	[theme.breakpoints.down('lg')]: {
		page: {
			'& .react-pdf__Page__canvas': {
				width: '100% !important',
			},
		},
	},
}))
