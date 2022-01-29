import { makeStyles, MenuItem, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

export default function NavSearchSuggestedItem({ details, handleChange }) {
  const mui = useStyles()
  const router = useRouter()

  const tagsFormat = details.tags
    .map(item => {
      if (item.name_short_en) return item.name_short_en
      else return item.name_vn
    })
    .join(', ')

  function handleClick() {
    router.push(`/${details.user.user_name}/${details.slug}`)
    handleChange('')
  }

  return (
    <MenuItem className={mui.item} onClick={handleClick}>
      <div>
        <Typography variant="body2" style={{ fontWeight: 'bold' }}>
          {details.name}
        </Typography>

        <Typography variant="caption">{`${details.faculty.name_short_vn} | ${details.published_year} | ${tagsFormat}`}</Typography>
      </div>
    </MenuItem>
  )
}

const useStyles = makeStyles(theme => ({
  item: {
    padding: theme.spacing(1, 1),
    borderBottom: '0.5px solid rgba(0, 0, 0, 0.1)',
  },
}))
