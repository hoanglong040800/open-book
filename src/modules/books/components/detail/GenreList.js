import { Button } from '@material-ui/core'
import { URL_FILTER_BOOKS } from 'common/constants'
import { toTitleCase } from 'common/utils/common.util'
import { useRouter } from 'next/router'

export default function GenreList({ genres }) {
	const router = useRouter()

	function onClickButton(id) {
		router.push({
			pathname: URL_FILTER_BOOKS,
			query: { genre: id },
		})
	}

	return (
		<div className="flex flex-wrap gap-small mt-medium">
			{genres.map(genre => (
				<Button
					key={genre.id}
					variant="outlined"
					color="primary"
					className="font-weight-regular rounded-full"
					onClick={() => onClickButton(genre.id)}
				>
					{toTitleCase(genre.name_en)}
				</Button>
			))}
		</div>
	)
}
