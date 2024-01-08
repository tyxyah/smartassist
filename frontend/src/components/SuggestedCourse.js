import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Avatar, Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { red, teal, deepPurple } from '@mui/material/colors';
import { useAuthContext } from '../hooks/useAuthContext';

const SuggestedCourses = () => {
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    // Make the network request to get suggested courses
    async function fetchSuggestedCourses() {
      try {
        const response = await fetch(`http://localhost:4000/api/study_scheme/suggest-failed-courses`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch suggested courses: ${response.statusText}`);
        }

        const data = await response.json();
        setSuggestedCourses(data.suggestedCourses);
      } catch (error) {
        console.error('Error fetching suggested courses:', error);
      }
    }

    fetchSuggestedCourses();
  }, [user]);

  // Modified getAvatarData to accept course_type
  const getAvatarData = (courseType) => {

    switch (courseType) {
      case '1':
        return { value: 'U', color: teal[500] };
      case '2':
        return { value: 'C', color: red[500] };
      case '3':
        return { value: 'EL', color: deepPurple[500] };
      default:
        return { value: '', color: 'grey' };
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {suggestedCourses.map((course, index) => {
          const avatarData = getAvatarData(course.course_type); // Pass course_type to getAvatarData
          return (
            <Card
              key={index}
              style={{
                width: '250px',
                height: '95px',
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
                  <Typography variant="h6">{course.course_code}</Typography>
                  <Typography variant="body2">{course.course_name}</Typography>
                  {/* Add additional information here if needed */}
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
