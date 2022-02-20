import { Button, Typography } from "@material-ui/core";
import React from "react";

export default function Description({ summary }) {
  return (
    <>
      <div>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: "20px 0" }}
        >
          Read
        </Button>
      </div>
      <Typography variant="p">{summary}</Typography>
    </>
  );
}
