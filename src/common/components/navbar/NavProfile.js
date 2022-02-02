import {
  Divider,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { signOut, useSession } from "next-auth/client";

export default function NavProfile() {
  const router = useRouter();
  const [session, loading] = useSession();
  const mui = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSelect(route) {
    router.push(route);
    handleClose();
  }

  function handleSignout() {
    const regEx = /settings|new|edit/;

    regEx.test(router.pathname)
      ? signOut({ callbackUrl: "/" })
      : signOut({ redirect: false });

    window.localStorage.clear()
    handleClose();
  }

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <AccountCircle fontSize="large" className={mui.icon} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem onClick={() => handleSelect(`/${session.user.user_name}`)}>
          <p className={mui.full_name}>{session.user.user_name}</p>
        </MenuItem>

        <Divider variant="middle" />

        <MenuItem
          onClick={() =>
            handleSelect(`/${session.user.user_name}?tab=bookmark`)
          }
        >
          Bookmarks
        </MenuItem>

        <MenuItem onClick={() => handleSelect("/settings")}>Cài đặt</MenuItem>

        <MenuItem onClick={handleSignout}>Đăng xuất</MenuItem>
      </Menu>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    color: [theme.palette.primary.main],
  },

  full_name: {
    fontWeight: "bold",
    padding: 0,
    margin: 0,
  },
}));
