
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';

const Header: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #ddd' }}>
      <Typography variant="h6">Revenue</Typography>
      <Button variant="outlined" startIcon={<DateRangeIcon />}>
        Jan 2024 - Dec 2026
      </Button>
    </Box>
  );
};

export default Header;
