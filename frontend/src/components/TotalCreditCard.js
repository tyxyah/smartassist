import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { Divider, Stack, LinearProgress } from "@mui/material";

const TotalCreditCard = () => {
  const totalRequiredCredits = 83;
  const totalEarnedCredits = 78;
  const progressPercentage = Math.floor((totalEarnedCredits / totalRequiredCredits) * 100);

  return (
    <div>
      <Typography sx={{ fontSize: "18px", marginBottom: 1, marginTop: 3 }}>
        Total Credit Hours <strong>125</strong>
      </Typography>
      <Card
        className="dashboard-card"
        style={{
          width: "248px",
          borderRadius: 3,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        <CardContent>
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
                <Typography>{totalRequiredCredits}</Typography>
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
                  Earned
                </Typography>
                <Typography>{totalEarnedCredits}</Typography>
              </Stack>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={progressPercentage}
              sx={{ height: 10, marginTop: 2 }}
            />
          </Stack>
        </CardContent>
      </Card>
      <div style={{ paddingTop: 2 }}>
        <Alert severity="info" sx={{ width: "218px", marginTop: 2 }}>
          Progress: <strong>{progressPercentage}% Complete</strong>
        </Alert>
      </div>
    </div>
  );
};

export default TotalCreditCard;
