import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red, teal, pink, deepPurple } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

function AcademicProgressCard() {
  const courses = [
    { type: "UNIVERSITI", progress: "67%" },
    { type: "CORE", progress: "67%" },
    { type: "ELECTIVE : LIMITED", progress: "25%" },
    { type: "ELECTIVE : GENERAL", progress: "46%" },
  ];

  const getAvatarData = (courseType) => {
    switch (courseType) {
      case "UNIVERSITI":
        return { value: "U", color: red[500] };
      case "CORE":
        return { value: "C", color: teal[500] };
      case "ELECTIVE : LIMITED":
        return { value: "L", color: pink[500] };
      case "ELECTIVE : GENERAL":
        return { value: "G", color: deepPurple[500] };
      default:
        return { value: "", color: "grey" };
    }
  };
  return (
    <Stack direction="row" spacing={3} padding={2}>
      {courses.map((course) => {
        const avatarData = getAvatarData(course.type);
        return (
          <Card sx={{ width: 220, height: 180, padding: 1 }}>
            <CardHeader
              title={
                <Typography
                  variant="body1"
                  color="textSecondary"
                  fontWeight="bold"
                  fontSize={14}
                >
                  {course.type}
                </Typography>
              }
              avatar={
                <Avatar sx={{ bgcolor: avatarData.color }}>
                  {avatarData.value}
                </Avatar>
              }
            />
            <CardContent>
              <Typography variant="h1" fontWeight="bold" fontSize={30}>
                {course.progress}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
}

export default AcademicProgressCard;
