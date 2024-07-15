// components/Sidebar.tsx
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

const Sidebar: React.FC = () => {
  return (
    <Box sx={{ width: '20%', p: 2, borderRight: '1px solid #ddd' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Inputs (4)</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Add</Button>
      </Box>
      <List>
        {['Monthly Churn Rate', 'Initial Customer Count', 'Monthly Contract Value', 'Monthly New Customers'].map((text, index) => (
          <ListItem key={index} secondaryAction={<InfoIcon />}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
