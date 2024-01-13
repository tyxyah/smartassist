import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const ElexCard = ({ title, data }) => {

  const { progress, required, completed } = data;
  return (
    <Card
      className="dashboard-card"
      style={{
        minWidth: "248px",
        borderRadius: 3,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      <CardContent>
        <Typography
          variant="body"
          component="div"
          sx={{ fontWeight: 500, textAlign: "left" }}
        >
          {title}
        </Typography>
        <Stack direction={"column"}>
          <Stack
            direction="row"
            spacing={2}
            paddingLeft={4}
            alignItems="center"
            marginTop="10px"
            marginY={2}
          >
            <Stack
              direction="column"
              alignItems="center" // Set this to center
              spacing={1}
              sx={{ minWidth: "60px" }}
            >
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "text.secondary",
                }}
              >
                Required
              </Typography>
              <Typography>{required}</Typography>
            </Stack>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack
              direction="column"
              alignItems="center" // Set this to center
              spacing={1}
              sx={{ minWidth: "60px" }}
            >
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "text.secondary",
                }}
              >
                Completed
              </Typography>
              <Typography>{completed}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <LinearProgress
              color={
                progress >= 66
                  ? "success"
                  : progress >= 33
                  ? "warning"
                  : "error"
              }
              variant="determinate"
              value={progress}
              sx={{ height: 4, width: "100%" }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
            >{`${progress}%`}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ElexCard;
