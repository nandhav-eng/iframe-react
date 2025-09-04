import { Typography, Box, Paper, Stack } from "@mui/material";
import React from "react";

const InteractionMiddlepanel = ({ selectedId, iframeRef, iframeRef2 }) => {

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
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
        <>
        <Typography variant="h6" gutterBottom color="primary">
          {selectedInteraction?.name}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Stack spacing={1}>
            <Typography variant="body2" fontWeight="bold">
              App 1
            </Typography>
          <Box
            ref={iframeRef}
            sx={{
              flexGrow: 1,
              width: "100%",
            }}
            />
            </Stack>
   
          <Stack spacing={1}>
            <Typography variant="body2" fontWeight="bold">
             App 2
            </Typography>
          <Box
            ref={iframeRef2}
            sx={{
              flexGrow: 1,
              width: "100%",
            }}
            />
            </Stack>
        </Stack>
        </>
    </Paper>
  );
};

export default InteractionMiddlepanel;
