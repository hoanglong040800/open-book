import HeadTitle from "common/components/headtitle/HeadTitle";
import { useEffect, useState } from "react";
import { getUserProfile } from "modules/users/api/users.api";
import { Container, Grid, Typography } from "@material-ui/core";

export default function ViewProfile() {
  const gridItemProperty = {
    property: {
      item: true,
      xs: 2,
    },

    value: {
      item: true,
      xs: 10,
    },
  };

  const [profile, setProfile] = useState({});

  useEffect(async () => {
    const res = await getUserProfile();
    setProfile(res);
  }, []);

  return (
    <>
      <HeadTitle page="profile" />

      <h1>Profile</h1>
      <Grid container>
        {/* Username */}
        <Grid {...gridItemProperty.property}>
          <h3>Username</h3>
        </Grid>
        <Grid {...gridItemProperty.value}>
          <p>{profile.user_name}</p>
        </Grid>

        {/* Email */}
        <Grid {...gridItemProperty.property}>
          <h3>Email</h3>
        </Grid>
        <Grid {...gridItemProperty.value}>
          <p>{profile.email}</p>
        </Grid>

        {/* Role */}
        <Grid {...gridItemProperty.property}>
          <h3>Role</h3>
        </Grid>
        <Grid {...gridItemProperty.value}>
          <p>{profile.role}</p>
        </Grid>

        {/* Full name */}
        <Grid {...gridItemProperty.property}>
          <h3>Full name</h3>
        </Grid>
        <Grid {...gridItemProperty.value}>
          <p>{profile.full_name}</p>
        </Grid>

        {/* Gender */}
        <Grid {...gridItemProperty.property}>
          <h3>Gender</h3>
        </Grid>
        <Grid {...gridItemProperty.value}>
          <p>{profile.gender}</p>
        </Grid>

        {/* Date of Birth */}
        {/* <Grid {...gridItemProperty.property}>
          <h3>Date of birth</h3>
        </Grid>
        <Grid {...gridItemProperty.value}>
          <p>{profile.day_of_birth}</p>
        </Grid> */}
      </Grid>
    </>
  );
}
