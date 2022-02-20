import React from "react";
import { Typography } from "@material-ui/core";

export default function MoreInfo({ publishedYear, publisher, pages }) {
  const props = {
    variant: "subtitle2",
    gutterBottom: true,
  };

  return (
    <>
      <Typography {...props}>Published year: {publishedYear}</Typography>
      <Typography {...props}>Published by: {publisher}</Typography>
      <Typography {...props}>Pages: {pages}</Typography>
    </>
  );
}
