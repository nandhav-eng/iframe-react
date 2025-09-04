import { Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import InteractionList from "./InteractionList";
import InteractionMiddlepanel from "./InteractionMiddlepanel";
import InteractionThirdPanel from "./InteractionThirdPanel";

const InteractionContainer = () => {
  const iframeRef = useRef(null);
  const [iframeCache, setIframeCache] = useState(null) // {id: iframe}

  const [selectedId, setSelectedId] = useState(1); 
  const [editMessage, setEditMessage] = useState("")

  const interactions = [
    { id: "1", name: "Interaction 1" },
    { id: "2", name: "Interaction 2" },
    { id: "3", name: "Interaction 3" },
    { id: "4", name: "Interaction 4" },
    { id: "5", name: "Interaction 5" },
  ];
  
  // Create iframe dynamically
  useEffect(() => {
    const frame = document.createElement("iframe");
    frame.style.width = "400px";
    frame.style.height = "200px";

    // Append to container
    iframeRef.current?.appendChild(frame);

    if (!iframeCache) {
      // Check obj str store
      setIframeCache((prev) => ({
        ...(prev || {}),   
        1: frame           
      }));
    }
    frame.src=`http://localhost:5174?interactionId=${1}`
  }, []);

  // Reuse already created iframe while navigation
  const handleNavigate = (id) => {
    const frame = iframeRef.current.querySelector("iframe");
    if (!frame) return;

    frame.src = `http://localhost:5174?interactionId=${id}`


    // Store prev iframe data
    setIframeCache((prev) => ({
      ...prev,
      [id]: frame,   
    }));
  };

  // Send event to iframe
  const handleEditMessage = (buttonValue) => {
    if (buttonValue === "Send to all") {
      interactions.forEach((interaction) => {
        if (iframeCache?.[interaction.id]) {
          console.log(`Sending event to iframe with id "${interaction.id}"`);
          iframeCache[interaction.id].contentWindow.postMessage(
            {
              type: "EDIT_MESSAGE",
              interactionId: interaction.id,
              message: editMessage,
            },
            "*"
          );
        } else {
          console.log(
            `%cIframe with id "${interaction.id}" not found in cache. Please navigate to it first and try again.`,
            "color: red; font-weight: bold;"
          );          
        }
      });
    } else {
      if (iframeCache?.[buttonValue]) {
        console.log(`Sending event to iframe with id "${buttonValue}"`);
        iframeCache[buttonValue].contentWindow.postMessage(
          {
            type: "EDIT_MESSAGE",
            interactionId: buttonValue,
            message: editMessage,
          },
          "*"
        );
      } else {
        console.log(
          `%cIframe with id "${buttonValue}" not found in cache. Please navigate to it first and try again.`,
          "color: red; font-weight: bold;"
        );        
      }
    }
  };
console.log("iframeCache-->", iframeCache);

  return (
    <Grid container spacing={2} width="100%" p={2}>
      <Grid  size={2}>
        <InteractionList onSelect={setSelectedId} selectedId={selectedId}
          handleNavigate={handleNavigate}
        />
      </Grid>
      <Grid  size={5} borderLeft="1px solid gray">
        <InteractionMiddlepanel
          selectedId={selectedId}
          iframeRef={iframeRef}
        />
      </Grid>

      <Grid size={5} borderLeft={"1px solid gray"}>
        <InteractionThirdPanel setEditMessage={setEditMessage} editMessage={setEditMessage} handleEditMessage={handleEditMessage} />
      </Grid>
    </Grid>
  );
};

export default InteractionContainer;
