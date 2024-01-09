import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('1', 159, 6.0),
  createData('2', 237, 9.0),
  createData('3', 262, 16.0),
  createData('4', 159, 6.0),
  createData('5', 237, 9.0),
  createData('6', 262, 16.0),
  createData('7', 237, 9.0),
  createData('8', 262, 16.0),
];

const rowsPerPage = 4;

export default function HistoryTable() {
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div style={{ width: 520 }}>
      <p style={{ fontSize: "18px" }}>Registration History</p>
      <TableContainer component={Paper} sx={{ width: 515, borderRadius: 1 }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  backgroundColor: '#1565C0',
                  color: 'white',
                  fontWeight: 525,
                }}
              >
                Semester
              </TableCell>
              <TableCell
                align="center"
                style={{
                  backgroundColor: '#1565C0',
                  color: 'white',
                  fontWeight: 525,
                }}
              >
                Taken Credit Hours
              </TableCell>
              <TableCell
                align="center"
                style={{
                  backgroundColor: '#1565C0',
                  color: 'white',
                  fontWeight: 525,
                }}
              >
                Required Credit Hours
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* TablePagination component rendered right below the Table */}
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
    </div>
  );
}
