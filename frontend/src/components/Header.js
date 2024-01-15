import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";
import SchoolIcon from "@mui/icons-material/School";
import { useAuthContext } from "../hooks/useAuthContext";

export default function UseFormControl() {
  const [userDetails, setUserDetails] = useState({});
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/student", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Received Data:", data);
          setUserDetails(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [user]);

  const getMuetLevel = (value) => {
    const muetValue = parseInt(value, 10);

    if (isNaN(muetValue)) {
      return "Invalid MUET Value";
    }

    if (muetValue === 1) {
      return "MUET 1 or 2";
    } else if (muetValue === 2) {
      return "MUET 3 or 4";
    } else if (muetValue === 3) {
      return "MUET 5 or 6";
    } else {
      return "Unknown MUET Level";
    }
  };

  const iconColor = "#403D42";

  return (
    <form
      noValidate
      autoComplete="on"
      className="form-container"
      style={{ height: 70 }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Box
          sx={{
            position: "fixed",
            backgroundColor: "white",
            height: 70,
            width: "100%",
            display: "flex",
            alignItems: "center",
            zIndex: 1200,
          }}
        >
          <Stack
            paddingLeft={34}
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ marginTop: 2, marginBottom: 2 }}
          >
            <AccountCircleIcon style={{ color: iconColor }} fontSize="small" />
            <Typography variant="subtitle1" color="textSecondary">
              Matric Number : {userDetails.username}
            </Typography>

            <LanguageIcon style={{ color: iconColor }} fontSize="small" />
            <Typography variant="subtitle1" color="textSecondary">
              {getMuetLevel(userDetails.muet)}
            </Typography>

            <SchoolIcon style={{ color: iconColor }} fontSize="small" />
            <Typography variant="subtitle1" color="textSecondary">
              Currently in Semester {userDetails.current_semester}
            </Typography>
          </Stack>
        </Box>
      </Grid>
    </form>
  );
}
