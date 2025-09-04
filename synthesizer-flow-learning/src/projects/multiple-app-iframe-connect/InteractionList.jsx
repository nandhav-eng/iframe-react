import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const InteractionList = ({ onSelect,selectedId, handleNavigate }) => {
  const interactions = [
    { id: "1", name: "Interaction 1" },
    { id: "2", name: "Interaction 2" },
    { id: "3", name: "Interaction 3" },
    { id: "4", name: "Interaction 4" },
    { id: "5", name: "Interaction 5" },
  ];

  return (
    <Stack spacing={1}>
      <Typography variant="h6" gutterBottom color="primary">
         Interaction List
      </Typography>
      
      {interactions.map((interaction) => (
        <Box
          key={interaction.id}
          sx={{
            border: "1px solid gray",
            p: "6px 10px",
            cursor: "pointer",
            borderRadius: "6px",
            transition: "0.2s",
            "&:hover": { backgroundColor: "lightblue" },
            backgroundColor: selectedId == interaction.id ? "lightblue" : ""
          }}
          onClick={() => { onSelect(interaction.id); handleNavigate(interaction.id) }}
        >
          <Typography variant="body2">{interaction.name}</Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default InteractionList;
