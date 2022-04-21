import { useEffect, useState } from 'react'
import HeadTitle from 'common/components/headtitle/HeadTitle'
import { USER_ROLES } from 'common/constants/common.constant'
import { deleteBook, getAllBooks } from 'modules/books/api/books.api'
import BooksManageTable from 'modules/books/components/table/BooksManageTable'
import { Divider, Fade, Modal, Paper } from '@material-ui/core'
import SubmitButton from 'common/components/button/SubmitButton'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

export default function Dashboard({}) {
	const router = useRouter()
	const [session, isLoadingSession] = useSession()
	const [allUserBooks, setAllUserBooks] = useState([])
	const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
	const [selectedBook, setSelectedBook] = useState(null)

	async function getAllUserBooks() {
		// todo update api
		const data = await getAllBooks()
		setAllUserBooks(data)
	}

	function onEditClick(slug) {
		router.push(`/books/${slug}/edit`)
	}

	function onDeleteClick(book) {
		setSelectedBook(book)
		setIsOpenConfirmModal(true)
	}

	function handleCloseConfirmModal() {
		setIsOpenConfirmModal(false)
	}

	async function handleDeleteBook(bookId) {
		await deleteBook(bookId)
		handleCloseConfirmModal()
	}

	useEffect(async () => {
		await getAllUserBooks()
	}, [])

	return (
		<>
			<HeadTitle page="Store Dashboard" />

			<h1>Dashboard of your {!isLoadingSession && session.user.full_name}</h1>

			<BooksManageTable
				rows={allUserBooks}
				onEditClick={onEditClick}
				onDeleteClick={onDeleteClick}
			/>

			<Modal
				open={isOpenConfirmModal}
				onClose={handleCloseConfirmModal}
				style={style.modal}
			>
				<Fade in={isOpenConfirmModal}>
					<Paper style={style.modalContent}>
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

const style = {
	modal: {
		top: '30%',
	},

	modalContent: {
		margin: 'auto',
		maxWidth: 500,
		padding: 20,
	},
}