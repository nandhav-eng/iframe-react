import React, { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  Panel,
  Position,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeComponent from "./NodeComponent";
import PaymentInit from "./PaymentInit";
import { useDnD } from "../context/DNDContext";
import ConfigurationDrawer from "./ConfigurationDrawer";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "First node label" },
  },
  {
    id: "2",
    position: { x: 20, y: 50 },
    data: {
      label: "Second node label",
    },
  },
  {
    id: "3",
    position: { x: 60, y: 90 },
    data: {
      label: "Third node label",
    },
  },
  {
    id: "4",
    position: { x: 100, y: 150 },
    data: {
      label: "Fourth node label",
    },
  },
  {
    id: "5",
    position: { x: 300, y: 300 },
    data: {
      // label: "Fifth node label",
    },
    type: "nodeComponent",
  },
  // {
  //   id: "6",
  //   position: { x: 300, y: 350 },
  //   data: {
  //     amount: 100,
  //   },
  //   type: "paymentInit",
  // },
  {
    id: "7",
    position: { x: 200, y: 550 },
    data: {
      node: "7th node",
    },
    type: "nodeComponent",
  },
];

const initialEdges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
  },
  {
    id: "2-3",
    source: "2",
    target: "3",
    animated: true,
  },
  {
    id: "2-4",
    source: "2",
    target: "4",
    animated: true,
  },
  {
    id: "4-5",
    source: "4",
    target: "5",
    animated: true,
  },
];

const types = {
  paymentInit: PaymentInit,
  nodeComponent: NodeComponent,
};

let id = 0;
const getId = () => "dnd-node-id-" + id++;

const Body = () => {
  const reactFlowWrapper = useRef(null);
  const [type, setType] = useDnD();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback((params) => {
    setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
  }, []);

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData("text/plain", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      // Check, if the dropped element is valid/not
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: type },
      };

      setNodes((nodes) => nodes.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={types}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Panel position="top-center">Node Flow</Panel>
        <Controls />
        <MiniMap zoomable pannable />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>

      <ConfigurationDrawer />
    </div>
  );
};

export default Body;
