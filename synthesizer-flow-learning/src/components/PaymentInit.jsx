import { Grid, Stack, Typography } from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const PaymentInit = (props) => {
  return (
    <Grid
      container
      border={1}
      p={2}
      sx={{
        background: "#6362621f",
      }}
    >
      <Grid size={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" fontWeight="bold">
            Title
          </Typography>

          <MoreVertIcon
            sx={{
              cursor: "pointer",
            }}
          />
        </Stack>
      </Grid>
      <Grid size={12}>Content</Grid>
      <Grid size={12}>Footer</Grid>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </Grid>
  );
};

export default PaymentInit;
