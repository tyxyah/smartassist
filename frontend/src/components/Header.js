import React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

export default function UseFormControl() {

  return (
    <form noValidate autoComplete="on" className="form-container"> 
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={9}></Grid>
          <Grid item xs={3}>
            <p className="logo" style={{paddingRight: 20}}> 
              <strong>SMART</strong>
              <i>ASSIST</i>
            </p>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
