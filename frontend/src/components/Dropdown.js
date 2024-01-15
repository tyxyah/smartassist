import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown({ onSemesterChange }) {
  const [semester, setSemester] = React.useState(1);

  const handleChange = (event) => {
    const newSemester = event.target.value;
    setSemester(newSemester);
    onSemesterChange(newSemester); // Call the callback function with the selected semester
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id="demo-select-small-label">History</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={semester}
        label="History"
        onChange={handleChange}
      >
        <MenuItem value={1}>Semester 1</MenuItem>
        <MenuItem value={2}>Semester 2</MenuItem>
        <MenuItem value={3}>Semester 3</MenuItem>
        <MenuItem value={4}>Semester 4</MenuItem>
        <MenuItem value={5}>Semester 5</MenuItem>
        <MenuItem value={6}>Semester 6</MenuItem>
        <MenuItem value={7}>Semester 7</MenuItem>
        <MenuItem value={8}>Semester 8</MenuItem>
      </Select>
    </FormControl>
  );
}
