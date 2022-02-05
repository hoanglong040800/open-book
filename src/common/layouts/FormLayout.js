import { Box } from "@material-ui/core";
import { toTitleCase } from "common/utils/common.util";

export default function FormLayout({ title, children }) {
  return (
    <Box display="flex" flexDirection="column" mx="auto" maxWidth="500px">
      <h1>{toTitleCase(title)}</h1>

      {children}
    </Box>
  )
}