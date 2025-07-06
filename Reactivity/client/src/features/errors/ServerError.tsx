import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
const {state} = useLocation(); 

  return (
    <Paper>
      {state.error ? (
        <>
        <Typography  variant="h3" sx={{ px: 4, pt:2}} color="secondary">
          {state.error?.message || 'Wystąpił bład'}
        </Typography>
        <Divider />
          <Typography  variant="body1" sx={{ px: 4, pt:2}} color="secondary">
          {state.error?.details || 'Błąd po stronie serwera.'}
        </Typography>
        </>
      ) : (
        <Typography variant="h5">Błąd serwera</Typography>
      )}
    </Paper>
  )
}
