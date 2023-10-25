import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import Clear from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

export default function UseFormControl() {
  const [searchValue, setSearchValue] = useState(""); // State for the input value

  const handleClearClick = () => {
    setSearchValue(""); // Clear the search input when the "Clear" button is clicked
  };

  return (
    <form noValidate autoComplete="on" position="fixed">
      <Box
        sx={{
          height: 80,
          backgroundColor: "white",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2.2}></Grid>
          <Grid item xs={7}>
            <FormControl sx={{ margin: "13px", width: "35ch" }}>
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
                    <Button
                      style={{
                        cursor: "pointer",
                        padding: 0, // Remove padding
                        minWidth: "auto", // Set minimum width to "auto"
                      }}
                      classes={{
                        root: "clear-button",
                      }}
                      onClick={handleClearClick} // Add onClick handler
                    >
                      <Clear />
                    </Button>
                  </InputAdornment>
                }
                value={searchValue} // Controlled input value
                onChange={(e) => setSearchValue(e.target.value)} // Update searchValue state
              />
            </FormControl>
          </Grid>
          <Grid item xs={2.7}>
            <p style={{ fontSize: "23px", margin: "13px", textAlign: "right" }}>
              <strong>SMART</strong>
              <i>ASSIST</i>
            </p>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
