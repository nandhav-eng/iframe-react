import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDnD } from "../context/DNDContext";

const SideBar = () => {
  const [_, setType] = useDnD();

  const nodes = [
    {
      label: "Callback",
    },
    {
      label: "Customer",
    },
    {
      label: "Debugging",
    },
    {
      label: "Distribution",
    },
    {
      label: "Integration",
    },
    {
      label: "Recording",
    },
  ];

  const [sideBarOptions, setSideBarOptions] = useState(nodes || []);

  const onDragStart = (event, nodeType) => {
    setType(nodeType.label);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      <Typography variant="body2" fontWeight="bold">
        Node pallete
      </Typography>
      <MenuList dense>
        {sideBarOptions.map((node) => {
          return (
            <Box onDragStart={(event) => onDragStart(event, node)} draggable>
              <MenuItem>{node.label}</MenuItem>
              <Divider />
            </Box>
          );
        })}
      </MenuList>
      <TextField
        label="New Node Label"
        variant="outlined"
        size="small"
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;

          setSideBarOptions((prev) => {
            return prev.concat({ label: e.target.value });
          });
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default SideBar;
