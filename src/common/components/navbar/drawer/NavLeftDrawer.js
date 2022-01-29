import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import { navlinks } from 'common/constants/common.constant'
import Link from 'next/link'
import NavLogo from '../NavLogo'
import DrawerNestedList from './DrawerNestedList'

export default function NavLeftDrawer({ open, onClose }) {
  const mui = useStyles()

  return (
    <Drawer open={open} onClose={onClose}>
      <List className={mui.list}>
        <NavLogo className={mui.logo} />

        {
          //
          navlinks.map(item => (
            <DrawerNestedList
              key={item.cate}
              title={item.cate}
              list={item.lists}
              onCloseDrawer={onClose}
            />
          ))
        }

        <Link href="/about">
          <a>
            <ListItem button onClick={onClose}>
              <ListItemText primary="About" />
            </ListItem>
          </a>
        </Link>
      </List>
    </Drawer>
  )
}

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
    padding: theme.spacing(3, 0),
  },

  logo: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2, 0),
  },
}))
