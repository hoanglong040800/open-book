import { useEffect, useState } from 'react'
import { HeadTitle, SubmitButton } from 'common/components'
import { deleteBook, getAllBooks } from 'modules/books/api'
import BooksManageTable from 'modules/books/components/table/BooksManageTable'
import { Divider, Fade, Modal, Paper } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import {
	USER_ROLES,
	URL_ADD_BOOK,
	URL_ADD_MULTI_BOOKS,
	URL_EDIT_BOOK,
	URL_UPLOAD_MULTI_FILES,
} from 'common/constants'
import Link from 'next/link'

export default function Dashboard({}) {
	const router = useRouter()
	const [session, isLoadingSession] = useSession()
	const [allUserBooks, setAllUserBooks] = useState([])
	const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
	const [selectedBook, setSelectedBook] = useState(null)

	async function getAllUserBooks() {
		const data = await getAllBooks()
		const storeBooks = data
			.reverse()
			.filter(book => book.owner_id === session.user.id)
		setAllUserBooks(storeBooks)
	}

	// add

	function handleAddBookClick() {
		router.push(URL_ADD_BOOK)
	}

	function handleAddMultiClick() {
		router.push(URL_ADD_MULTI_BOOKS)
	}

	// edit

	function handleEditClick(slug) {
		router.push(URL_EDIT_BOOK(slug))
	}

	// delete

	function handleCloseConfirmModal() {
		setIsOpenConfirmModal(false)
	}

	function handleDeleteClick(book) {
		setSelectedBook(book)
		setIsOpenConfirmModal(true)
	}

	async function handleDeleteBook(bookId) {
		await deleteBook(bookId)
		handleCloseConfirmModal()
		setAllUserBooks(allUserBooks.filter(book => book.id != bookId))
	}

	useEffect(async () => {
		await getAllUserBooks()
	}, [])

	return (
		<>
			<HeadTitle page="Store Dashboard" />

			<h1>Dashboard of my {!isLoadingSession && session.user.full_name}</h1>

			<SubmitButton
				text="Add Book"
				onClick={handleAddBookClick}
				onSecondaryClick={handleAddMultiClick}
				textSecondary="Add Multi Books"
			/>

			<Link href={URL_UPLOAD_MULTI_FILES}>
				<a style={styles.link}>
					Want to prepare thumbnails/pdf links? Click here
				</a>
			</Link>

			<BooksManageTable
				rows={allUserBooks}
				onEditClick={handleEditClick}
				onDeleteClick={handleDeleteClick}
			/>

			<Modal
				open={isOpenConfirmModal}
				onClose={handleCloseConfirmModal}
				style={styles.modal}
			>
				<Fade in={isOpenConfirmModal}>
					<Paper style={styles.modalContent}>
						<h3>Warning</h3>

						<p>
							Do you want to delete <b>{selectedBook?.name}</b>?. This action
							cannot undo
						</p>

						<Divider />

						<SubmitButton
							text="Confirm"
							onClick={() => handleDeleteBook(selectedBook?.id)}
							textSecondary="Cancel"
							onSecondaryClick={handleCloseConfirmModal}
						/>
					</Paper>
				</Fade>
			</Modal>
		</>
	)
}

Dashboard.auth = true
Dashboard.allowedRole = USER_ROLES.store

const styles = {
	modal: {
		top: '30%',
	},

	modalContent: {
		margin: 'auto',
		maxWidth: 500,
		padding: 20,
	},

	link: {
		display: 'flex',
		fontSize: '1rem',
		justifyContent: 'flex-end',
		margin: '30px 0 20px 0',
	},
}
