import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import "./loading.css"

const Loading = () => {


  return (
    <div className='loading-box'>
      <CircularProgress  className='loading'/>
    </div>
  );
};

export default Loading;
