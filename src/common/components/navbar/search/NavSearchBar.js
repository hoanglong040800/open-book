import { makeStyles } from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import { useRouter } from 'next/router'
import { useState } from 'react'


export default function NavSearchBar() {
	const mui = useStyles()
	const router = useRouter()
	const [stateValue, setStateValue] = useState('')

	function handleChange(value) {
		value ? setStateValue(value.trim()) : setStateValue('')
	}

	function handleSearch() {
		if (stateValue) {
			router.push({
				pathname: '/books/search',
				query: { q: stateValue },
			})
			setStateValue('')
		}
	}

	return (
		<div className={mui.root}>
			<SearchBar
				value={stateValue}
				placeholder="title or keyword"
				onChange={handleChange}
				onRequestSearch={handleSearch}
				onCancelSearch={handleChange}
				className={mui.searchbar}
			/>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		display: 'flex',
		flex: 1,
		justifyContent: 'flex-end',
		margin: '0 15px',
	},

	searchbar: {
		width: '100%',
		maxWidth: 500,
		padding: 0,
		height: 35,

		'& input': {
			fontSize: '0.9rem',
		},
	},
}))
