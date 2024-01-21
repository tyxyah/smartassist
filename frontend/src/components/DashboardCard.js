import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { red, teal, deepPurple, grey } from "@mui/material/colors";

const DashboardCard = ({ title, courseType }) => {
  const { progress, required, completed } = courseType;
  const formattedProgress = Math.round(progress); // Format progress to one decimal place

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

  const data = [
    { value: completed, label: " Credit Completed", color: color },
    { value: required - completed, label: "Credit Remaining", color: remainingColor  },
  ];
  
  const size = {
    width: 310,
    height: 150,
  };

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 16,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  return (
    <Card
      className="dashboard-card"
      style={{
        minWidth: "248px",// Increased height to accommodate circular progress
        borderRadius: 10,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      <CardContent>
        <Typography
          variant="body"
          component="div"
          sx={{ fontFamily: 'Arial', fontWeight: "bold", marginBottom: "20px", textAlign: "left" }}
        >
          {title}
        </Typography>
      <PieChart series={[{ data, innerRadius: 60, outerRadius: 73 }]} {...size} slotProps={{
    legend: { hidden: true },
  }}>
      <PieCenterLabel >{formattedProgress}%</PieCenterLabel>
    </PieChart>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
