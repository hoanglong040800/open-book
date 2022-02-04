import { Box, makeStyles, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { useRouter } from "next/router";

export default function NavLinkMenu({ name, lists }) {
  const classes = useStyles();
  const router = useRouter();
  const [menu, setMenu] = useState({ display: "none" });

  function handleClick() {
    setMenu({ display: "block" });
  }

  function handleClose() {
    setMenu({ display: "none" });
  }

  function handleClickItem(item) {
    alert(item);
    // router.push(
    //   {
    //     pathname: '/explore',
    //     query: item.query,
    //   },
    //   undefined,
    //   { shallow: true }
    // )
  }

  return (
    <Box position="relative">
      <Box
        size="small"
        className={classes.button}
        onMouseEnter={handleClick}
        onMouseLeave={handleClose}
      >
        {name}
      </Box>

      <Box
        {...menu}
        className={classes.menu}
        onMouseEnter={handleClick}
        onMouseLeave={handleClose}
      >
        {
          //
          lists.map((item) => (
            <MenuItem key={item.name} onClick={() => handleClickItem(item)}>
              {item.name}
            </MenuItem>
          ))
        }
      </Box>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  button: {
    color: "inherit",
    fontSize: "1rem",
    fontWeight: "bold",
    padding: "5px 1.25rem",

    "&:hover": {
      cursor: "pointer",
    },
  },

  menu: {
    position: "fixed",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "5px",
    boxShadow: "1px 1px 5px 0 rgba(0, 0, 0, 0.05)",
  },
}));
