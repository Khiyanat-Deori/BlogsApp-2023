import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh" // Set to the desired height of your loading spinner container
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
