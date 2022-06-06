import { Grid, MenuItem } from '@material-ui/core'
import {
	FooterButtons,
	SelectController,
	TextFieldController,
	CenteredContainer,
} from 'common/components'
import { toTitleCase } from 'common/utils/common.util'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export function FilterController({ params, onChangeFilter, genres }) {
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm()
	const [isFirstTime, setIsFirstTime] = useState(true)

	useEffect(() => {
		if (Object.keys(params).length !== 0 && isFirstTime) {
			reset(params)
			setIsFirstTime(false)
		}
	}, [params])

	function onClear() {
		reset({
			authors: '',
			genre: '',
			sort: '',
			language: '',
		})
	}

	return (
		<CenteredContainer title="Advanced Search">
			<Grid {...props.gridContainer}>
				<Grid {...props.gridItem}>
					<TextFieldController
						label="Authors"
						name="authors"
						control={control}
						errors={errors}
					/>
				</Grid>

				<Grid {...props.gridItem}>
					<SelectController
						label="Genre"
						name="genre"
						control={control}
						errors={errors}
					>
						{genres?.map(genre => (
							<MenuItem key={genre.id} value={genre.id}>
								{toTitleCase(genre.name_en)}
							</MenuItem>
						))}
					</SelectController>
				</Grid>

				<Grid {...props.gridItem}>
					<SelectController
						label="Views"
						name="sort"
						control={control}
						errors={errors}
					>
						<MenuItem value="view.desc">Descending</MenuItem>
						<MenuItem value="view.asc">Ascending</MenuItem>
					</SelectController>
				</Grid>

				<Grid {...props.gridItem}>
					<SelectController
						label="Language"
						name="language"
						control={control}
						errors={errors}
					>
						<MenuItem value="en">English</MenuItem>
						<MenuItem value="vn">Vietnamese</MenuItem>
					</SelectController>
				</Grid>
			</Grid>

			<FooterButtons
				text="Filter"
				onClick={handleSubmit(onChangeFilter)}
				textSecondary="Clear"
				onSecondaryClick={onClear}
			/>
		</CenteredContainer>
	)
}

const props = {
	gridContainer: {
		container: true,
		spacing: 3,
	},

	gridItem: {
		item: true,
		xs: 12,
		sm: 6,
		md: 4,
		lg: 3,
	},
}
