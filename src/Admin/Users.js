// import React from 'react';
// import DataView from '../Components/DataView';

// const Users = ({ UserData }) => {
//   console.log("user", UserData);

//   return (
//     <div>
//       <div className='userdata'>
//         {UserData.map((data, index) => (
//           <DataView key={index}>
//             <div>{data.name}</div>
//             <div>{data.email}</div>
//             <div>{data.mobile}</div>
//           </DataView>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Users;

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

const Users = ({ UserData }) => {
  // console.log(RecOrder)
  return (
    <React.Fragment>
      <div className='order-container'>
      
        <Typography component="h2" variant="h5" color="primary" fontWeight="bold" align='center' gutterBottom>
          All Users
        </Typography>
       
        <Table size="medium">
          <TableHead>
            <TableRow >
   
              <TableCell sx={{ fontWeight: 'bold', fontSize: '15px' }}>Name</TableCell>
              {/* <TableCell  sx={{ fontWeight: 'bold', fontSize: '15px' }}>Address</TableCell> */}
              <TableCell sx={{ fontWeight: 'bold', fontSize: '15px' }}>Mobile</TableCell>
              <TableCell  sx={{ fontWeight: 'bold', fontSize: '15px' }}>Email ID</TableCell>
         
            </TableRow>
          </TableHead>
          <TableBody>
            {UserData.map((row) => (
              <TableRow key={row._id}>
                <TableCell className='cell-data'>{row.name}</TableCell>
                {/* <TableCell className='cell-data '>{row.address}</TableCell> */}
                <TableCell className='cell-data'>{row.mobile}</TableCell>
                <TableCell  className='cell-data'>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
     
      </div>
    </React.Fragment>
  )
}

export default Users

