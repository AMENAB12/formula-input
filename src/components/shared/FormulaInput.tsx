// // components/FormulaInput.tsx
// 'use client';

// import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
// import Autosuggest from 'react-autosuggest';
// import { Box, TextField, IconButton, styled, Chip } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { useQuery } from '@tanstack/react-query';
// import useStore from '../lib/store/store';

// interface Suggestion {
//   name: string;
// }

// const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
//   const response = await fetch(`https://your-api-endpoint/suggestions?q=${query}`);
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// const TagChip = styled(Chip)`
//   margin: 4px;
//   .MuiChip-label {
//     font-size: 14px;
//   }
//   .MuiChip-deleteIcon {
//     color: #888;
//   }
// `;

// const FormulaInput: React.FC = () => {
//   const [input, setInput] = useState<string>('');
//   const { tags, addTag, removeTag } = useStore();
//   const [query, setQuery] = useState<string>('');

//   const { data: suggestions = [], refetch } = useQuery({
//     queryKey: ['suggestions', query],
//     queryFn: () => fetchSuggestions(query),
//     enabled: false,
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => {
//     setInput(newValue);
//     setQuery(newValue);
//     refetch();
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter' && input.trim()) {
//       addTag(input.trim());
//       setInput('');
//     }
//   };

//   const inputProps = {
//     placeholder: 'Enter formula',
//     value: input,
//     onChange: handleChange,
//     onKeyDown: handleKeyDown,
//   };

//   const handleDeleteTag = (index: number) => {
//     removeTag(index);
//   };

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', border: '1px solid #ccc', borderRadius: '4px', p: 1 }}>
//       {tags.map((tag, index) => (
//         <TagChip
//           key={index}
//           label={tag}
//           onDelete={() => handleDeleteTag(index)}
//           deleteIcon={<CloseIcon />}
//         />
//       ))}
//       <Autosuggest
//         suggestions={suggestions}
//         onSuggestionsFetchRequested={() => {}}
//         onSuggestionsClearRequested={() => {}}
//         getSuggestionValue={(suggestion: Suggestion) => suggestion.name}
//         renderSuggestion={(suggestion: Suggestion) => <span>{suggestion.name}</span>}
//         inputProps={inputProps}
//         theme={{
//           suggestionsContainerOpen: {
//             position: 'absolute',
//             zIndex: 1,
//             marginTop: '10px',
//             border: '1px solid #aaa',
//             backgroundColor: '#fff',
//             fontSize: '16px',
//             borderRadius: '4px',
//           },
//           suggestion: {
//             cursor: 'pointer',
//             padding: '10px 20px',
//           },
//           suggestionHighlighted: {
//             backgroundColor: '#ddd',
//           },
//         }}
//       />
//     </Box>
//   );
// };

// export default FormulaInput;
