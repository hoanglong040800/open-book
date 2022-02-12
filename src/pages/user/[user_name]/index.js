import HeadTitle from "common/components/headtitle/HeadTitle";
import { useEffect, useState } from "react";
import { getUserProfile } from "modules/users/api/users.api";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default function ViewProfile() {
  const classes = useStyle();
  const gridItemProperty = {
    property: {
      item: true,
      xs: 4,
      sm: 5,
      md: 4,
      lg: 3,
    },
    value: {
      item: true,
      xs: 8,
      sm: 7,
      md: 8,
      lg: 9,
    },
  };

  const [profile, setProfile] = useState();

  useEffect(async () => {
    const res = await getUserProfile();
    setProfile(res);
  }, []);

  return (
    <>
      <HeadTitle page="profile" />
      {profile && (
        <Grid container>
          <Grid item xs={12} sm={4} className={classes.profileTitle}>
            <h1>Profile</h1>
          </Grid>
          <Grid item xs={12} sm={8} container className={classes.infoContainer}>
            <Grid {...gridItemProperty.property}>
              <h3>Username</h3>
            </Grid>
            <Grid {...gridItemProperty.value}>
              <p>{profile.user_name}</p>
            </Grid>
            <Grid {...gridItemProperty.property}>
              <h3>Email</h3>
            </Grid>
            <Grid {...gridItemProperty.value}>
              <p>{profile.email}</p>
            </Grid>
            <Grid {...gridItemProperty.property}>
              <h3>Full name</h3>
            </Grid>
            <Grid {...gridItemProperty.value}>
              <p>{profile.full_name}</p>
            </Grid>
            <Grid {...gridItemProperty.property}>
              <h3>Role</h3>
            </Grid>
            <Grid {...gridItemProperty.value}>
              <p>{profile.role}</p>
            </Grid>
            <Grid {...gridItemProperty.property}>
              <h3>Gender</h3>
            </Grid>
            <Grid {...gridItemProperty.value}>
              <p>{profile.gender}</p>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  profileTitle: {
    textAlign: "center",
  },

  infoContainer: {
    borderLeft: `4px solid ${theme.palette.primary.light}`,
    paddingLeft: "30px",
  },

  [theme.breakpoints.down("xs")]: {
    infoContainer: {
      borderLeft: "none",
      paddingLeft: "none",
    },
  },
}));
