import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const loading = () => {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex:'100' }}
        open={true}
        
      >
        <CircularProgress color="secondary" />

      </Backdrop>
    </div>
  )
}

export default loading
