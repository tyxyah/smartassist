import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown({ onCourseTypeChange }) {
  const [course_type, setCourseType] = React.useState('');

  const handleChange = (event) => {
    const newCourseType = event.target.value;
    setCourseType(newCourseType);
    onCourseTypeChange(newCourseType); // Call the callback function with the course type
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id="demo-select-small-label">Select Course Type</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={course_type}
        label="Select Course Type"
        onChange={handleChange}
      >
        <MenuItem value={1}>Universiti Courses</MenuItem>
        <MenuItem value={2}>Core Courses</MenuItem>
        <MenuItem value={3}>Elective: Limited</MenuItem>
        <MenuItem value={4}>Elective: General</MenuItem>
      </Select>
    </FormControl>
  );
}
