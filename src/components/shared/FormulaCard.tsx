// components/FormulaCard.tsx
'use client';

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Box, Typography, Paper, IconButton, Button, Chip, Collapse, TextField } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import Autosuggest from 'react-autosuggest';
import useStore from '../lib/store/store';

interface TimeSegment {
  startDate: string;
  endDate: string;
  items: string[];
}

interface FormulaCardProps {
  formula: string;
  index: number;
}

const dummySuggestions = [
  "Initial Customer Count",
  "Monthly Churn Rate",
  "Monthly Contract Value",
  "Monthly New Customers",
  "Revenue",
  "Expenses",
  "Net Income",
  "Customer Satisfaction",
  "Employee Count"
];

const FormulaCard: React.FC<FormulaCardProps> = ({ formula, index }) => {
  const { removeFormula, addTagToFormula, addTimeSegment, removeTimeSegment, removeTagFromFormula, addItemToSegment, removeItemFromSegment } = useStore();
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState<string>('');
  const [newSegment, setNewSegment] = useState<TimeSegment>({
    startDate: 'Jan 2024',
    endDate: 'Dec 2024',
    items: []
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [segmentInputs, setSegmentInputs] = useState<string[]>([]);

  const handleRemoveFormula = () => {
    removeFormula(index);
  };

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      addTagToFormula(index, input.trim());
      setInput('');
    }
  };

  const handleNewSegmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSegment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddSegment = () => {
    if (newSegment.startDate && newSegment.endDate) {
      addTimeSegment(index, newSegment);
      setNewSegment({
        startDate: 'Jan 2024',
        endDate: 'Dec 2024',
        items: []
      });
      setSegmentInputs([...segmentInputs, '']);
    }
  };

  const handleRemoveSegment = (segmentIndex: number) => {
    removeTimeSegment(index, segmentIndex);
    setSegmentInputs(segmentInputs.filter((_, i) => i !== segmentIndex));
  };

  const handleRemoveTag = (tagIndex: number) => {
    removeTagFromFormula(index, tagIndex);
  };

  const handleSegmentInputChange = (segmentIndex: number, value: string) => {
    const updatedInputs = [...segmentInputs];
    updatedInputs[segmentIndex] = value;
    setSegmentInputs(updatedInputs);
  };

  const handleSegmentInputKeyDown = (e: KeyboardEvent<HTMLInputElement>, segmentIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = segmentInputs[segmentIndex].trim();
      if (value && suggestions.includes(value)) {
        addItemToSegment(index, segmentIndex, value);
        setSegmentInputs((prev) => {
          const newInputs = [...prev];
          newInputs[segmentIndex] = '';
          return newInputs;
        });
      }
    }
  };

  const handleSuggestionsFetchRequested = ({ value }: { value: string }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const filteredSuggestions = inputLength === 0
      ? []
      : dummySuggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(inputValue)
        );

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: string) => suggestion;

  const renderSuggestion = (suggestion: string) => <span>{suggestion}</span>;

  const handleSuggestionSelected = (event: React.FormEvent, { suggestion, suggestionValue }: { suggestion: string, suggestionValue: string }) => {
    const segmentIndex = segmentInputs.findIndex(input => input === suggestionValue);
    if (segmentIndex !== -1) {
      addItemToSegment(index, segmentIndex, suggestionValue);
      setSegmentInputs((prev) => {
        const newInputs = [...prev];
        newInputs[segmentIndex] = '';
        return newInputs;
      });
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, backgroundColor: "#d1cdcd", borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={toggleExpanded}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <Typography>
            Customer
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ mr: 2 }}>Jul 2024</Typography>
          <IconButton>
            <InfoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton onClick={handleRemoveFormula}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: "#e5e5e5" }}>
          <ErrorIcon color="error" />
          <Typography variant="h6" color="error" sx={{ ml: 1 }}>
            #ERROR
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          {useStore.getState().formulas[index].segments.map((segment, segmentIndex) => (
            <Box key={segmentIndex} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, background: "#f9f8f8", borderRadius: 2, paddingX: 3, }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}> {segment.startDate} → {segment.endDate}</Typography>
                <IconButton size="small" onClick={() => handleRemoveSegment(segmentIndex)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 1, border: '1px solid #ccc', borderRadius: '4px', p: 1 }}>
                {segment.items.map((item, itemIndex) => (
                  <Chip key={itemIndex} label={item} onDelete={() => removeItemFromSegment(index, segmentIndex, itemIndex)} deleteIcon={<CloseIcon />} sx={{ margin: 0.5 }} />
                ))}
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                  onSuggestionsClearRequested={handleSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  onSuggestionSelected={handleSuggestionSelected}
                  inputProps={{
                    placeholder: "Add item",
                    value: segmentInputs[segmentIndex] || '',
                    onChange: (_, { newValue }) => handleSegmentInputChange(segmentIndex, newValue),
                    onKeyDown: (e:any) => handleSegmentInputKeyDown(e, segmentIndex),
                  }}
                  theme={{
                    suggestionsContainerOpen: {
                      position: 'absolute',
                      zIndex: 1,
                      marginTop: '10px',
                      border: '1px solid #aaa',
                      backgroundColor: '#fff',
                      fontSize: '16px',
                      borderRadius: '4px',
                    },
                    suggestion: {
                      cursor: 'pointer',
                      padding: '10px 20px',
                    },
                    suggestionHighlighted: {
                      backgroundColor: '#ddd',
                    },
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
        <Button variant="text" onClick={handleAddSegment}>+ Add Time Segment</Button>
      </Collapse>
    </Paper>
  );
};

export default FormulaCard;
