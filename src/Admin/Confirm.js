import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';



const Confirm = ({ ConfOrder }) => {
  console.log(ConfOrder)

  return (
    <React.Fragment>
      <div className='order-container'>
      <Paper >
        <Typography component="h2" variant="h5" color="primary" fontWeight="bold" align='center' gutterBottom>
          Confirm Orders
        </Typography>
       
        <Table size="medium">
          <TableHead>
            <TableRow >
   
              <TableCell sx={{ fontWeight: 'bold', fontSize: '15px' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '15px' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '15px' }}>Date</TableCell>
              <TableCell  sx={{ fontWeight: 'bold', fontSize: '15px' }}>Amount</TableCell>
         
            </TableRow>
          </TableHead>
          <TableBody>
            {ConfOrder && ConfOrder.map((row) => (
              row.bill_address && <TableRow key={row._id} sx={{ m: 0 }}>
                <TableCell className='cell-data'>{row.bill_address.name}</TableCell>
                <TableCell className='cell-data'>{row.bill_address.address + " " + row.bill_address.city}</TableCell>
                <TableCell className='cell-data'>{new Date(row.bill_address.orderDate).toLocaleDateString('en-GB')}</TableCell>
                <TableCell  className='cell-data'>
                {row.payment && (
                  <div>{row.payment.total}</div>
                )}
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      </div>
    </React.Fragment>
  )
}

export default Confirm
