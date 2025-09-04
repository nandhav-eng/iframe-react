import { Button, Grid, TextField, Paper, Typography, Stack } from "@mui/material";
import React from "react";

const InteractionThirdPanel = ({ setEditMessage,handleEditMessage }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
          background: "linear-gradient(145deg, #f9f9f9, #ffffff)",
        height:"96.8%"
      }}
    >
      <Typography variant="h6" gutterBottom color="primary">
        Update Interaction Message
      </Typography>

      <TextField
        placeholder="Enter message to update"
        fullWidth
        size="small"
        onChange={(e) => setEditMessage(e.target.value)}
      />

      <Stack spacing={2} mt={3}>
        <Button variant="contained" size="medium" color="primary" fullWidth onClick={() => handleEditMessage("Send to all")}>
          Send to All
        </Button>

        <Typography variant="body2" color="textSecondary">
          Or send to a specific interaction:
        </Typography>

        <Grid container spacing={1}>
          {[1, 2, 3, 4, 5].map((id) => (
            <Grid item xs={6} sm={4} key={id}>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={() => handleEditMessage(id)}
              >
                Interaction {id}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Paper>
  );
};

export default InteractionThirdPanel;
