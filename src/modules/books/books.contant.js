const EbooksLogErrors = {
	LINK_NOT_FOUND: 'Link not found',
	NAME_NOT_FOUND: 'Name not found',
	THUMBNAIL_NOT_FOUND: 'Thumbnail not found',
	LINK_INVALID: 'Link is invalid',
	THUMBNAIL_INVALID: 'Thumbnail is invalid',
	PUBLISHED_YEAR_INVALID: 'Published year must be greater than 1900',
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
