import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuthContext } from '../hooks/useAuthContext';

function LinearProgressWithLabel({ progress }) {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 34 }}>
      <Box sx={{ width: '93%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: '4px',
            borderRadius: '8px',
          }}
          color={"primary"}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ color: "primary" }}
        >{`${progress.toFixed(2)}%`}</Typography>
      </Box>
    </Box>
  );
}

const LinearWithValueLabel = () => {
  const [progress, setProgress] = useState(0);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:4000/api/dashboard/credit-hours-until-current-semester',
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const progressValue = parseFloat(
            data.credit_hours_to_graduate.progress
          );
          setProgress(progressValue);
        } else {
          console.error('Failed to fetch credit hours data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel progress={progress} />
    </Box>
  );
};

export default LinearWithValueLabel;
