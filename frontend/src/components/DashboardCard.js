import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularWithValueLabel from "./CircularLabel";
import { Stack, Divider } from "@mui/material";
import { red, teal, deepPurple, grey } from "@mui/material/colors";

const DashboardCard = ({ title, courseType }) => {
  const { progress, required, completed } = courseType;
  let color;
  let remainingColor;
  switch (title) {
    case 'Universiti Courses':
      color = teal[500];
      remainingColor = teal[100]
      break;
    case 'Core Courses':
      color = red[500];
      remainingColor = red[100];
      break;
    case 'Electives':
      color = deepPurple[500];
      remainingColor = deepPurple[100];
      break;
    default:
      color = grey[500];
      remainingColor = grey[100];
  }

  return (
    <Card
      className="dashboard-card"
      style={{
        minWidth: "248px",
        height: "255px", // Increased height to accommodate circular progress
        borderRadius: 3,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      <CardContent>
        <Typography
          variant="body"
          component="div"
          sx={{ fontWeight: 500, marginBottom: "10px", textAlign: "left" }}
        >
          {title}
        </Typography>
        <CircularWithValueLabel value={progress} color={color} remainingColor={remainingColor}/>
        <Stack direction={"column"}>
          <Stack
            direction="row"
            spacing={2}
            paddingLeft={3}
            alignItems="center"
            marginTop="10px"
            marginY={2}
          >
            <Stack
              direction="column"
              alignItems="center"
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
              alignItems="center"
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
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
