import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import Clear from "@mui/icons-material/Clear";
import Button from "@mui/material/Button"
import { Grid } from "@mui/material";

export default function UseFormControl() {
  return (
    <form noValidate autoComplete="on" position="fixed">
      <Box
        sx={{
          height: 80,
          backgroundColor: "white",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2.5}></Grid>
          <Grid item xs={7}>
            <FormControl sx={{ margin: "13px", width: "30ch" }}>
              <OutlinedInput
                size="small"
                placeholder="Search"
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <Button><Clear /></Button>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={2.5}>
            <p style={{ fontSize: "23px" }}>
              <strong>SMART</strong>
              <i>ASSIST</i>
            </p>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
