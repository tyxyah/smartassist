import React from 'react';
import { Card, CardContent, Typography, Avatar, Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { red, teal, deepPurple } from '@mui/material/colors';

const SuggestedCourses = () => {
  const courses = [
    { title: 'Course 1', type: 1, name: 'Universiti' },
    { title: 'Course 2', type: 2, name: 'Core' },
    { title: 'Course 3', type: 3, name: 'Elective' },
  ];

  const getAvatarData = (courseType) => {
    switch (courseType) {
      case 1:
        return { value: 'U', color: teal[500] };
      case 2:
        return { value: 'C', color: red[500] };
      case 3:
        return { value: 'E', color: deepPurple[500] };
      default:
        return { value: '', color: 'grey' };
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {courses.map((course, index) => {
          const avatarData = getAvatarData(course.type);
          return (
            <Card
              key={index}
              style={{
                maxWidth: '277px',
                maxHeight: '90px',
                marginRight: '20px',
                flex: '1',
                display: 'flex',
                flexDirection: 'row',
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
                  <Typography variant="body2">{course.name}</Typography>
                </div>
                <Button
                  style={{
                    minWidth: 'auto',
                    minHeight: 'auto',
                  }}
                >
                  <AddCircleOutlineOutlinedIcon />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedCourses;
