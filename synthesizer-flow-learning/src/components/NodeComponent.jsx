import { X } from "@mui/icons-material";
import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import React from "react";
import { useUtilsProvider } from "../context/UtilsContext";

const NodeComponent = (props) => {
  const { setNodes } = useReactFlow();
  const [openDrawer, setOpenDrawer] = useUtilsProvider();

  const paymentProviders = ["Paypal", "Gpay", "Paytm", "Bank transfer"];

  return (
    <Box border="1px solid green" p={1} bgcolor={"#ebebeb"}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="body2"
          fontWeight="bold"
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          Payment provider
        </Typography>

        <Tooltip title="Delete" arrow placement="top">
          <X
            sx={{
              fontSize: "14px",
              ml: "12px",
              cursor: "pointer",
              color: "red",
            }}
            onClick={() =>
              setNodes((prevNodes) => {
                return prevNodes.filter((node) => node.id !== props.id);
              })
            }
          />
        </Tooltip>
      </Stack>

      {paymentProviders.map((provider) => {
        return (
          <Box>
            <Divider
              sx={{
                my: 1,
              }}
            />

            <Typography variant="body2">{provider}</Typography>
          </Box>
        );
      })}

      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </Box>
  );
};

export default NodeComponent;
