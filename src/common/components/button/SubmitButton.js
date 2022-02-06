import { Box, Button } from "@material-ui/core";

export default function SubmitButton({ text = 'Submit', onClick }) {
  return (
    <Box display="flex" justifyContent="flex-end" mt={3}>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        {text}
      </Button>
    </Box>
  )
}