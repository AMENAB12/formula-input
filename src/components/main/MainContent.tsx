// components/MainContent.tsx
'use client';

import React from 'react';
import { Box, Typography, Button, List } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useStore from '../lib/store/store';
import FormulaCard from '../shared/FormulaCard';

const MainContent: React.FC = () => {
  const { formulas, addFormula } = useStore();

  const handleAddFormula = () => {
    addFormula('New Formula');
  };

  return (
    <Box sx={{ flex: 1, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Formulas</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddFormula}>Add</Button>
      </Box>
      {/* <FormulaInput /> */}
      <List>
        {formulas.map((formulaObj, index) => (
          <FormulaCard key={index} index={index} formula={formulaObj.formula} />
        ))}
      </List>
    </Box>
  );
};

export default MainContent;
