// import React from 'react'
// import DataView from '../Components/DataView'

// const Cancelled = ({ConcOrder}) => {
//   return (
//     <div>
//        {ConcOrder.map((data, index) => (
//         <DataView key={index}>
       
//           <div>{data.bill_address.name}</div>
//           <div>{data.bill_address.address +" "+ data.bill_address.city}</div>
//           <div>{data.bill_address.mobile}</div>
//           <div>{data.payment.total}</div>
          
          
//          </DataView>
//       ))}
//     </div>
//   )
// }

// export default Cancelled

import React, { useContext } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function preventDefault(event) {
  event.preventDefault();
}

const Cancelled = ({ ConcOrder }) => {
  // console.log(RecOrder)
  return (
    <React.Fragment>
      <div className='order-container'>
      <Paper >
        <Typography component="h2" variant="h5" color="primary" fontWeight="bold" align='center' gutterBottom>
          Cancelled Orders
        </Typography>
       
        <Table size="medium">
          <TableHead>
            <TableRow >
   
              <TableCell sx={{ fontWeight: 'bold', fontSize: '15px' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '15px' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '15px' }}>Date</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '15px' }}>Amount</TableCell>
         
            </TableRow>
          </TableHead>
          <TableBody>
            {ConcOrder.map((row) => (
              <TableRow key={row._id}>
                <TableCell className='cell-data'>{row.bill_address.name}</TableCell>
                <TableCell className='cell-data'>{row.bill_address.address + " " + row.bill_address.city}</TableCell>
                <TableCell className='cell-data'>{new Date(row.bill_address.orderDate).toLocaleDateString('en-GB')}</TableCell>
                <TableCell align="right" className='cell-data'>{row.payment.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      </div>
    </React.Fragment>
  )
}

export default Cancelled
