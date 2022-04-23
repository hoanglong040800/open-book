import { createContext, useEffect, useState } from 'react'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { USER_ROLES } from 'common/constants'
import { CardContainer, HeadTitle } from 'common/components'
import { RatingDisplay, RatingItem } from 'modules/rating/components'
import { addRating, deleteRating, getRatingByBookId } from 'modules/rating/api'
import { DetailBookContainer } from 'modules/books/components'
import { getBookBySlug } from 'modules/books/api'


const BookmarkContext = createContext()

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx)
	return {
		props: {
			session,
			slug: ctx.query.slug,
		},
	}
}

export default function ViewBook({ session, slug }) {
	const router = useRouter()
	const [bookInfo, setBookInfo] = useState(null)
	// rating
	const [canComment, setCanComment] = useState(false)
	const [rating, setRating] = useState({
		comment: '',
		point: 1,
	})
	const [ratingList, setRatingList] = useState(null)
	const [pointOverall, setPointOverall] = useState(0)
	// bookmark
	const [isBookmarked, setIsBookmarked] = useState()
	const isViewer = session?.user.role === USER_ROLES.viewer

	useEffect(() => {
		if (!bookInfo) getBookInfo()
		else if (!ratingList) getRatings()
	}, [bookInfo])

	async function getBookInfo() {
		const data = await getBookBySlug(slug)
		setBookInfo(data)
	}

	async function getRatings() {
		const data = await getRatingByBookId(bookInfo.id)
		setPointOverall(data?.point_overall)
		setRatingList(data?.rating)
		checkCanComment(data, session)
	}

	async function handleSubmitRating() {
		await addRating(bookInfo.id, rating)
		getRatings()
	}

	async function handleDeleteRating() {
		const data = await getRatingByBookId(bookInfo.id)
		const deleteItem = data.rating.find(
			item => item.user.id === session?.user.id,
		)
		await deleteRating(deleteItem.rating_id)
		getRatings()
	}

	function checkCanComment(data, session) {
		// logined
		session?.user && setCanComment(true)

		// check already comment
		data.length != 0 &&
			data?.rating.find(item => item.user.id == session?.user.id) &&
			setCanComment(false)
	}

	function handleChangeComment(event) {
		setRating(prev => ({
			...prev,
			comment: event.target.value,
		}))
	}

	function handleChangePoint(event, newValue) {
		setRating(prev => ({
			...prev,
			point: newValue,
		}))
	}

	function onClickRead() {
		router.push(`/books/${bookInfo.slug}/read`)
	}

	return (
		<>
			<HeadTitle page="detail" />

			<div style={styles.container}>
				<BookmarkContext.Provider value={{ isBookmarked, isViewer }}>
					<DetailBookContainer bookInfo={bookInfo} onClickRead={onClickRead} />
				</BookmarkContext.Provider>

				<CardContainer>
					{canComment && (
						<>
							<RatingItem
								comment={rating.comment}
								point={rating.point}
								onChangePoint={handleChangePoint}
								onChangeComment={handleChangeComment}
								handleSubmitRating={handleSubmitRating}
							/>
						</>
					)}

					{ratingList && (
						<RatingDisplay
							ratingList={ratingList}
							pointOverall={pointOverall}
							showDeleteButton={session?.user.id}
							handleDeleteRating={handleDeleteRating}
						/>
					)}
				</CardContainer>
			</div>
		</>
	)
}

const styles = {
	container: {
		maxWidth: '1000px',
		margin: '0 auto',
	},
}
