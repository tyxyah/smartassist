// DashboardCard.js

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DashboardCard = ({ title, data }) => {
  return (
    <Card
      className="dashboard-card"
      style={{
        width: "248px",
        height: "125px",
        borderRadius: 3,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      <CardContent>
        <Typography variant="body" component="div" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
        {data.map((course, index) => (
          <Typography key={index} sx={{ fontSize: 45, fontWeight: 'bold', marginTop: '10px' }}>
            {course.progress}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

// Example data for different types of courses
export const mathProgress = [
  { progress: 75 }
  // Add more courses as needed
];

export const scienceProgress = [
  { progress: 90 }
  // Add more courses as needed
];

export const computerProgress = [
  { progress: 90 }
  // Add more courses as needed
];

export default DashboardCard;