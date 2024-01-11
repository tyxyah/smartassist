import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

function CircularProgressWithLabel(props) {
  const { value, color, remainingColor } = props;

  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress variant="determinate" size={120} value={100} sx={{ color: remainingColor }} />
      <CircularProgress variant="determinate" size={120} value={value} sx={{ color: color, position: 'absolute', zIndex: 2 }} />
      <Box
        sx={{
          position: 'absolute',
          zIndex: 3,
        }}
      >
        <Typography variant="body" component="div" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  remainingColor: PropTypes.string.isRequired,

};

export default function CircularWithValueLabel({ value, color, remainingColor }) {
  return <CircularProgressWithLabel value={value} color={color} remainingColor={remainingColor} />;
}
