import React from 'react';
import { Card, CardContent, Typography, Avatar, Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { red, teal, pink, deepPurple } from '@mui/material/colors';

const SuggestedCourses = () => {
  const courses = [
    { title: 'Course 1', type: 'Universiti Courses' },
    { title: 'Course 2', type: 'Core Courses' },
    { title: 'Course 3', type: 'Elective: Limited' },
    { title: 'Course 4', type: 'Elective: General' },
  ];

  const getAvatarData = (courseType) => {
    switch (courseType) {
      case 'Universiti Courses':
        return { value: 'U', color: red[500] };
      case 'Core Courses':
        return { value: 'C', color: teal[500] };
      case 'Elective: Limited':
        return { value: 'L', color: pink[500] };
      case 'Elective: General':
        return { value: 'G', color: deepPurple[500] };
      default:
        return { value: '', color: 'grey' };
    }
  };

  return (
    <div>
      <h3>Suggested Courses</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {courses.map((course, index) => {
          const avatarData = getAvatarData(course.type);
          return (
            <Card
              key={index}
              style={{
                maxWidth: '277px',
                maxHeight: '90px',
                margin: '10px',
                flex: '1',
                display: 'flex',
                flexDirection: 'row', // Make content align horizontally
              }}
            >
              <CardContent
                style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
              >
                <Avatar sx={{ bgcolor: avatarData.color }}>
                  {avatarData.value}
                </Avatar>
                <div style={{ flex: '1', marginLeft: '17px' }}>
                  <Typography variant="h6">{course.title}</Typography>
                  <Typography variant="body2">{course.type}</Typography>
                </div>
                <Button
                  style={{
                    minWidth: 'auto',
                    minHeight: 'auto',
                  }}
                  onClick={() => handleAddToTable(course)}
                >
                  <AddCircleOutlineOutlinedIcon />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <h3>Table List</h3>
      {/* Implement your table component here */}
    </div>
  );
};

const handleAddToTable = (course) => {
  // Implement the logic to add the course to your table list here
  console.log('Added to table:', course);
};

export default SuggestedCourses;
