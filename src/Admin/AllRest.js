import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


const AllRest = ({ RestData }) => {
  console.log("RestData",RestData)
  return (
    <React.Fragment>
      <div className='order-container'>
      <Paper >
        <Typography component="h2" variant="h5" color="primary" fontWeight="bold" align='center' gutterBottom>
          All Restaurants
        </Typography>
       
        <Table size="medium">
          <TableHead>
            <TableRow >
   
              <TableCell sx={{ fontWeight: 'bold', fontSize: '15px' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '15px' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '15px' }}>Mobile</TableCell>
              {/* <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '15px' }}>Email ID</TableCell> */}
         
            </TableRow>
          </TableHead>
          <TableBody>
            {RestData.map((row) => (
              <TableRow key={row._id}>
                <TableCell className='cell-data'>{row.name}</TableCell>
                <TableCell className='cell-data'>{row.addr}</TableCell>
                <TableCell className='cell-data'>{row.mobile}</TableCell>
                {/* <TableCell align="right" className='cell-data'>{row.email}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      </div>
    </React.Fragment>
  )
}

export default AllRest

