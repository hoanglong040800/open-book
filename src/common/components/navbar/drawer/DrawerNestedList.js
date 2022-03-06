import { Box, Collapse, List, ListItem, ListItemText } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { toTitleCase } from 'common/utils/common.util'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function DrawerNestedList({ title, list, onCloseDrawer }) {
	const mui = useStyles()
	const router = useRouter()
	const [open, setOpen] = useState(false)

	function handleToggleList() {
		setOpen(!open)
	}

	function handleClickItem(item) {
		router.push(
		  {
		    pathname: '/books/filter',
		    query: {genre: item.id},
		  },
		  undefined,
		  { shallow: true }
		)

		onCloseDrawer()
	}

	return (
		<Box my={1}>
			<ListItem button onClick={handleToggleList}>
				<ListItemText primary={title} />

				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>

			<Collapse in={open} timeout="auto" unmountOnExit>
				<List>
					{
						//
						list.map(item => (
							<ListItem
								button
								className={mui.listItem}
								onClick={() => handleClickItem(item)}
							>
								<ListItemText primary={toTitleCase(item.name_en)} />
							</ListItem>
						))
					}
				</List>
			</Collapse>
		</Box>
	)
}

const useStyles = makeStyles(theme => ({
	listItem: {
		paddingLeft: theme.spacing(3),
		borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
	},
}))
