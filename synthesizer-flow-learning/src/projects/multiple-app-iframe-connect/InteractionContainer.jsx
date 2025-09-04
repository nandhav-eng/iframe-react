import { Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import InteractionList from "./InteractionList";
import InteractionMiddlepanel from "./InteractionMiddlepanel";
import InteractionThirdPanel from "./InteractionThirdPanel";

const interactions = [
  { id: "1", name: "Interaction 1" },
  { id: "2", name: "Interaction 2" },
  { id: "3", name: "Interaction 3" },
  { id: "4", name: "Interaction 4" },
  { id: "5", name: "Interaction 5" },
];

const IframeMultiAppConnect = () => {
  const [selectedId, setSelectedId] = useState(1); 
  const [editMessage, setEditMessage] = useState("")

  const [activeApp, setActiveApp] = useState([])

  const iframeRef = useRef(null);
  const [iframeCache, setIframeCache] = useState(null) // {id: iframe}

  const iframeRef2 = useRef(null)
  const [iframeCacheApp2, setIframeCacheApp2] = useState(null)
  // Todo: Maintain app details in variable like [{appId, name, url}] and create state dynamically
  // Ex: iframeCache -> {appId: {interactionId: iframe}}, iframeRef -> {appId: iframe}

// helper function to create cache, reuse existing iframe based on active app
const createIframe = (ref, setCache, url, id) => {
  const frame = document.createElement("iframe");
  frame.style.width = "250px";
  frame.style.height = "200px";
  frame.src = `${url}?interactionId=${id}`;
  frame.style.border = "1px solid gray"
  frame.style.borderRadius = "6px"


  ref.current?.appendChild(frame);

  setCache((prev) => ({
    ...(prev || {}),
    [id]: frame,
  }));
};

useEffect(() => {
  createIframe(iframeRef, setIframeCache, "http://localhost:5174", 1);
  createIframe(iframeRef2, setIframeCacheApp2, "http://localhost:5175", 1);
}, []);

// Reuse already created iframe while navigation based on the app
const handleNavigate = (id) => {
  const frame1 = iframeRef.current?.querySelector("iframe");
  const frame2 = iframeRef2.current?.querySelector("iframe");

  if (!frame1 || !frame2) return;

  // Update srcs separately
  frame1.src = `http://localhost:5174/?interactionId=${id}`;
  frame2.src = `http://localhost:5175/?interactionId=${id}`;

  // Store in App1 cache
  setIframeCache((prev) => ({
    ...prev,
    [id]: frame1,
  }));

  // Store in App2 cache
  setIframeCacheApp2((prev) => ({
    ...prev,
    [id]: frame2,
  }));
};

// Send event to iframe(s)
  const handleEditAndSendMessage = (buttonValue) => {
    // Check any one of the app selected/not
    if (activeApp.length === 0) {
      console.log(
        `%cPlease select one app and try again.`,
        "color: red; font-weight: bold;"
      );
    }
    
    // Based on selected app send events
  activeApp.forEach((app) => {
    const targetCache = app === "app1" ? iframeCache : iframeCacheApp2;

    // If user selected send to all interactions
    if (buttonValue === "Send to all") {
      interactions.forEach((interaction) => {
        if (targetCache?.[interaction.id]) {
          console.log(
            `Sending event to ${app} iframe with id "${interaction.id}"`
          );
          targetCache[interaction.id].contentWindow.postMessage(
            {
              type: "EDIT_MESSAGE",
              interactionId: interaction.id,
              message: editMessage,
            },
            "*"
          );
        } else {
          console.log(
            `%c${app} iframe with id "${interaction.id}" not found in cache. Please navigate to it first and try again.`,
            "color: red; font-weight: bold;"
          );
        }
      });
    } else {
      // If user selected particular interaction to send events
      if (targetCache?.[buttonValue]) {
        console.log(
          `Sending event to ${app} iframe with id "${buttonValue}"`
        );
        targetCache[buttonValue].contentWindow.postMessage(
          {
            type: "EDIT_MESSAGE",
            interactionId: buttonValue,
            message: editMessage,
          },
          "*"
        );
      } else {
        console.log(
          `%c${app} iframe with id "${buttonValue}" not found in cache. Please navigate to it first and try again.`,
          "color: red; font-weight: bold;"
        );
      }
    }
  });
};

  return (
    <Grid container spacing={2} width="100%" p={2} height="90vh">
      <Grid  size={2}>
        <InteractionList onSelect={setSelectedId} selectedId={selectedId}
          handleNavigate={handleNavigate}
        />
      </Grid>
      <Grid  size={5} borderLeft="1px solid #e5e5e5">
        <InteractionMiddlepanel
          selectedId={selectedId}
          iframeRef={iframeRef}
          iframeRef2={iframeRef2}
        />
      </Grid>

      <Grid size={5} borderLeft={"1px solid #e5e5e5"}>
        <InteractionThirdPanel setEditMessage={setEditMessage} editMessage={setEditMessage} handleEditMessage={handleEditAndSendMessage} setActiveApp={setActiveApp}
        activeApp={activeApp}
        />
      </Grid>
    </Grid>
  );
};

export default IframeMultiAppConnect;