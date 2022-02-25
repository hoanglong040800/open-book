import { Container, Grid, Typography } from '@material-ui/core'
import HeadTitle from 'common/components/headtitle/HeadTitle'
import { getBookById } from 'modules/books/api/books.api'
import { addRating, getRatingByBookId } from 'modules/rating/api/rating.api'
import { useEffect } from 'react'
import { useState } from 'react'
import ImageContainer from 'modules/books/components/detail/ImageContainer'
import MainInfo from 'modules/books/components/detail/MainInfo'
import Description from 'modules/books/components/detail/Description'
import Tags from 'modules/books/components/detail/Tags'
import MoreInfo from 'modules/books/components/detail/MoreInfo'
import RatingItem from 'modules/rating/components/RatingItem'
import { useSession } from 'next-auth/client'

export async function getServerSideProps(ctx) {
	return {
		props: {
			slug: ctx.query.slug,
		},
	}
}

export default function ViewBook({ slug }) {
	const gridProps = {
		imgSection: {
			xs: 12,
			md: 4,
			lg: 3,
		},

		infoSection: {
			xs: 12,
			md: 8,
			lg: 9,
		},
	}

	const tags = [
		'romance',
		'fantasy',
		'thriller',
		'philosophy',
		'history',
		'war',
	]

	const [session, isLoading] = useSession()
	const [isCommented, setIsCommented] = useState(true)
	const [bookInfo, setBookInfo] = useState()

	const [rating, setRating] = useState({
		comment: '',
		point: 1,
	})

	// display comments and ratings
	const [ratingList, setRatingList] = useState()

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

	async function handleSubmitRating() {
		const res = await addRating(bookInfo.id, rating)
		getRatings()
		console.log(rating)
		console.log(res)
	}

	async function getRatings() {
		const data = await getRatingByBookId(slug)

		data?.rating.map(item => {
			if (item.user.id === session?.user.id) {
				setIsCommented(false)
			}
		})

		setRatingList(data)
	}

	useEffect(() => {
		async function getBookInfo() {
			const data = await getBookById(slug)
			setBookInfo(data)
		}

		getBookInfo()
		getRatings()
	}, [])

	return (
		<>
			<HeadTitle page="detail" />
			{bookInfo && (
				<Container>
					<Grid container spacing={4}>
						<Grid
							container
							item
							justifyContent="center"
							{...gridProps.imgSection}
						>
							<ImageContainer thumbnail={bookInfo.thumbnail.link_storage} />
						</Grid>
						<Grid item {...gridProps.infoSection}>
							<MainInfo
								title={bookInfo.name}
								authors={bookInfo.authors}
								view={bookInfo.view}
							/>
							<br />
							<MoreInfo
								publishedYear={bookInfo.published_year}
								pages={bookInfo.pages}
								publisher={bookInfo.publisher}
							/>
							<Description summary={bookInfo.summary} />
							<Tags tags={tags} />
						</Grid>
						{session && isCommented && (
							<Grid item xs={12}>
								<RatingItem
									comment={rating.comment}
									point={rating.point}
									onChangePoint={handleChangePoint}
									onChangeComment={handleChangeComment}
									handleSubmitRating={handleSubmitRating}
								/>
							</Grid>
						)}
					</Grid>
					<pre>{JSON.stringify(ratingList, null, 2)}</pre>
				</Container>
			)}
		</>
	)
}
