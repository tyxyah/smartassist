// CourseSuggestion.js
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const CourseSuggestion = () => {
  const [modelName, setModelName] = useState('');
  const [currentSemester, setCurrentSemester] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [suggestedCourses, setSuggestedCourses] = useState([]);

  const handleModelNameChange = (event) => {
    setModelName(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setCurrentSemester(event.target.value);
  };

  const suggestCourses = async () => {
    const apiUrl = 'http://localhost:4000/api/suggest_course';

    try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ modelName, currentSemester }),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('Received data:', data);
          setSuggestedCourses(data.failedCourses); 
          setResultMessage('Courses suggested successfully');
        } else {
          setResultMessage('Failed to suggest courses');
        }
      } catch (error) {
        setResultMessage(`Error during course suggestion: ${error.message}`);
        console.error('Error during course suggestion:', error);
      }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Course Suggestion
      </Typography>
      <TextField
        label="Model Name"
        variant="outlined"
        value={modelName}
        onChange={handleModelNameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Current Semester"
        variant="outlined"
        value={currentSemester}
        onChange={handleSemesterChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={suggestCourses}>
        Suggest Courses
      </Button>
      {resultMessage && (
        <Typography variant="body1" style={{ marginTop: '16px' }}>
          {resultMessage}
        </Typography>
      )}
      {suggestedCourses && (
        <List style={{ marginTop: '16px' }}>
          {suggestedCourses.map((course) => (
            <ListItem key={course}> {/* Add a key for each list item */}
              <ListItemText primary={course} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default CourseSuggestion;
