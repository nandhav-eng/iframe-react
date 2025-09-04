import { Typography, Box, Paper } from "@mui/material";
import React from "react";

const InteractionMiddlepanel = ({ selectedId, iframeRef }) => {

  const interactions = [
    { id: "1", name: "Interaction 1" },
    { id: "2", name: "Interaction 2" },
    { id: "3", name: "Interaction 3" },
    { id: "4", name: "Interaction 4" },
    { id: "5", name: "Interaction 5" },
  ];

  const selectedInteraction = interactions.find((i) => i.id == selectedId);
  
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
        <>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: "primary.main",
            }}
          >
            {selectedInteraction?.name}
          </Typography>
          <Box
            ref={iframeRef}
            sx={{
              flexGrow: 1,
              width: "100%",
            }}
          />
        </>
    </Paper>
  );
};

export default InteractionMiddlepanel;
