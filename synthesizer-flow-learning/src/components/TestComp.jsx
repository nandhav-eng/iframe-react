import { Box, Typography } from '@mui/material';
import React from 'react'

const TestComp = () => {
  return (
    <div>
      <h1>Test Comp</h1> 
      <Button>Click me</Button>
      <Button>Click me</Button>
      <Button>Click me</Button> 
      <Box>
        <Typography>Hello</Typography>
        <Typography>Hello</Typography>
      </Box>
      
    </div>
  )
};

export default TestComp;