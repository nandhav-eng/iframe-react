import { Divider, Drawer, Stack, Typography } from "@mui/material";
import React from "react";
import { useUtilsProvider } from "../context/UtilsContext";
import { X } from "@mui/icons-material";

const ConfigurationDrawer = () => {
  const [openDrawer, setOpenDrawer] = useUtilsProvider();

  return (
    <Drawer
      open={openDrawer}
      anchor="right"
      PaperProps={{
        sx: { width: "40%" },
      }}
    >
      <Stack p={1}>
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2" fontWeight="bold">
            Drawer Title
          </Typography>
          <X
            sx={{
              fontSize: "12px",
              cursor: "pointer",
            }}
            onClick={() => setOpenDrawer(false)}
          />
        </Stack>
        <Divider
          sx={{
            my: 1,
          }}
        />
        Configuration Drawer
      </Stack>
    </Drawer>
  );
};

export default ConfigurationDrawer;
