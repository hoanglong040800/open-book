import HeadTitle from 'common/components/headtitle/HeadTitle'
import { getBookBySlug } from 'modules/books/api/books.api'
import { addRating, getRatingByBookId } from 'modules/rating/api/rating.api'
import { useEffect } from 'react'
import { useState } from 'react'
import RatingItem from 'modules/rating/components/RatingItem'
import { getSession } from 'next-auth/client'
import DetailBookContainer from 'modules/books/components/detail/DetailBookContainer'
import RatingContainer from 'modules/rating/components/RatingContainer'
import RatingDisplay from 'modules/rating/components/RatingDisplay'

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
	const [canComment, setCanComment] = useState(false)
	const [bookInfo, setBookInfo] = useState(null)
	const [rating, setRating] = useState({
		comment: '',
		point: 1,
	})
	const [ratingList, setRatingList] = useState(null)
	const [pointOverall, setPointOverall] = useState(0)

	/*
	 *  Hook
	 */

	useEffect(() => {
		console.clear()
		if (!bookInfo) getBookInfo()
		else if (!ratingList) getRatings()
	}, [bookInfo])

	/*
	 *  Async Functions
	 */

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

	/*
	 *  Functions
	 */

	function checkCanComment(data, session) {
		session?.user && setCanComment(true)
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

	/*
	 *  JSX
	 */

	return (
		<>
			<HeadTitle page="detail" />

			<div style={styles.container}>
				<DetailBookContainer bookInfo={bookInfo} />

				<RatingContainer>
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
						/>
					)}
				</RatingContainer>
			</div>
		</>
	)
}

/*
 * Style
 */

const styles = {
	container: {
		maxWidth: '1000px',
		margin: '0 auto',
	},
}
