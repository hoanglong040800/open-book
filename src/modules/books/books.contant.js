import { URL_BOOK_DETAILS } from 'common/constants'
import Link from 'next/link'

const EbooksLogErrors = {
	LINK_NOT_FOUND: 'Link not found',
	NAME_NOT_FOUND: 'Name not found',
	THUMBNAIL_NOT_FOUND: 'Thumbnail not found',
	LINK_INVALID: 'Link is invalid',
	THUMBNAIL_INVALID: 'Thumbnail is invalid',
	PUBLISHED_YEAR_INVALID: 'Published year must be greater or equal to 1902',
	PREDICT_GENRE_FAILED: "Can't predict genres",
}

export const ebooksLogColDef = [
	{
		field: 'data.thumbnail',
		headerName: 'Thumbnail',
		width: 200,
		align: 'center',
		renderCell: url => <img src={url} width={80} />,
	},
	{
		field: 'data.name',
		headerName: 'Title',
		width: 600,
	},
	{
		field: 'error',
		headerName: 'Error',
		renderCell: errorCode => {
			return <p className="font-size-large">{EbooksLogErrors[errorCode]}</p>
		},
	},
]

export const dashboardColDef = [
	{
		field: '',
		headerName: 'Name',
		width: 300,
		renderCell: ebook => {
			return (
				<Link href={URL_BOOK_DETAILS(ebook.slug)}>
					<a>{ebook.name}</a>
				</Link>
			)
		},
	},
	{
		field: 'authors',
		headerName: 'Authors',
		width: 200,
	},
	{
		field: 'published_year',
		headerName: 'Publish Year',
		width: 150,
		align: 'center',
	},
	{
		field: 'genres',
		headerName: 'Genres',
		width: 300,
		renderCell: genres => genres.map(g => g.name_en).join(', '),
	},
	{
		field: 'view',
		headerName: 'Views',
		width: 100,
		align: 'center',
	},
]
