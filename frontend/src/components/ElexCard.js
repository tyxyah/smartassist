import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import TrendingUp from "@mui/icons-material/TrendingUpRounded";
import TrendingDown from "@mui/icons-material/TrendingDownRounded";

const ElexCard = ({ title, data, completedData }) => {
  const { required } = data;
  const { completed } = completedData;

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = () => {
    if (title === "CEL (Subject)" && completed - required > 0) {
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          width: 175,
          minHeight: 100,
          cursor: "pointer", // Set cursor to pointer for clickable effect
        }}
        onClick={handleCardClick}
      >
        <Box sx={{ color: "text.secondary", marginBottom: 1 }}>{title}</Box>
        <Box
          sx={{
            color: "text.primary",
            fontSize: 34,
            fontWeight: "medium",
            marginLeft: 1,
          }}
        >
          {completed}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            color:
              completed - required < 0
                ? "#ff1744" // color for negative status
                : completed - required > 0
                ? "#009688" // color for positive status
                : "#009688", // color for zero status (same as positive)
            fontSize: 14,
            fontWeight: "bold",
            alignItems: "center",
          }}
        >
          {completed - required !== 0 ? (
            <>
              {completed - required < 0 ? (
                <TrendingDown sx={{ marginRight: 0.5, display: "inline" }} />
              ) : (
                <TrendingUp sx={{ marginRight: 0.5, display: "inline" }} />
              )}
              {completed - required < 0 ? "-" : "+"}
              {Math.abs(completed - required)}{" "}
              {title === "LAX (Point)" ? "Point" : "Subject"}
            </>
          ) : (
            <>On track</>
          )}
        </Box>
      </Box>

      {/* Dialog for CEL (Subject) */}
      {title === "CEL (Subject)" && completed - required > 0 && (
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Congratulations!</DialogTitle>
          <DialogContent>
            <Typography>
              You are eligible to claim CEL certificate for the subject.
            </Typography>
            <Typography>
              Kindly proceed to the CALC (Centre for the Advancement of Language
              Competence) at UPM to claim your CEL certificate. Your language
              proficiency deserves recognition!
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
            >
              <Button color="primary" onClick={handleDialogClose}>
                CLOSE
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ElexCard;
