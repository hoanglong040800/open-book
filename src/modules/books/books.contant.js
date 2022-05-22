import { Check, Close } from '@material-ui/icons'

const EbooksLogErrors = {
	LINK_NOT_FOUND: 'Link not found',
	NAME_NOT_FOUND: 'Name not found',
	THUMBNAIL_NOT_FOUND: 'Thumbnail not found',
	LINK_INVALID: 'Link is invalid',
	THUMBNAIL_INVALID: 'Thumbnail is invalid',
	PUBLISHED_YEAR_INVALID: 'Published year is invalid',
	PREDICT_GENRE_FAILED: "Can't predict genres",
}

export const ebooksLogColDef = [
	{
		field: 'name',
		headerName: 'First name',
		width: 300,
	},
	{
		field: 'thumbnail',
		headerName: 'Thumbnail',
		width: 400,
	},
	{
		field: 'status',
		headerName: 'Status',
		width: 100,
		renderCell: status => {
			switch (status) {
				case true:
					return <Check color="primary" />
				case false:
					return <Close color="error" />
				default:
					return <></>
			}
		},
	},
	{
		field: 'error',
		headerName: 'Error',
		width: 200,
		renderCell: errorCode => {
			return EbooksLogErrors[errorCode]
		},
	},
]
