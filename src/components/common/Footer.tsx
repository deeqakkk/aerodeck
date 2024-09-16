import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ p: 2, mt: 'auto', backgroundColor: '#f1f1f1', textAlign: 'center' }}>
      <Typography variant="body2" color="textSecondary">
        © 2024 AeroDeck. All rights reserved. | I'm new to testing in React, tried it first time here in this project.
      </Typography>
    </Box>
  );
};

export default Footer;