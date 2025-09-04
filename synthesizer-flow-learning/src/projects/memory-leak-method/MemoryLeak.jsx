import React, { useEffect, useRef, useState } from "react";
import { Button, Box, Stack } from "@mui/material";

const MemoryLeak = () => {
  const iframeRef = useRef(null);
  const [oldDoc, setOldDoc] = useState(null);

  useEffect(() => {
    // Create iframe dynamically
    const frame = document.createElement("iframe");
    frame.style.width = "400px";
    frame.style.height = "200px";

    // Append to container
    iframeRef.current.appendChild(frame);

    // On load, save first document reference
      frame.addEventListener("load", () => {
          if (!oldDoc) {
              // Check obj str store
              setOldDoc((prev) => ({
                ...(prev || {}),   
                0: frame           
              }));
                  
        console.log("Saved old iframe document:", frame);

        // Attach foo listener on iframe document
        frame.contentWindow.document.addEventListener("foo", (e) => {
          console.log("received event 1", e.detail);
        });
      }
    });

    // Start with about:blank
    frame.src=`http://localhost:5173/`

  }, []); // run only once

  const handleNavigate = (id) => {
    const frame = iframeRef.current.querySelector("iframe");
    if (!frame) return;

    frame.src = `http://localhost:5173?interactionId=${3}`
    console.log("Iframe navigated to new page");
    setOldDoc((prev) => ({
        ...prev,
        [id]: frame,   
      }));  
      
    frame.addEventListener(
      "load",
      () => {
        try {
          // Same-origin only
          frame.contentWindow.document.addEventListener("foo", (e) => {
            console.log("navigated---->", e.detail);
          });
        } catch (err) {
          console.log(
            "Cannot attach listener on cross-origin iframe:",
            err.message
          );
        }
      },
      { once: true }
    );
  };

const handleShowOld = () => {
    if (oldDoc) {
      const msg = oldDoc.contentWindow.document.body.innerHTML;
      console.log("Old iframe document body.innerHTML:", msg);
      alert("Old iframe document says: " + msg);
    } else {
      console.log("Old document not saved yet.");
    }
  };

    const handleSendEvent = (id) => {   
        if (oldDoc?.[id]) {   
      oldDoc[id].contentWindow.document.dispatchEvent(
        new CustomEvent("foo", { detail: { message: "hello from button" } })
      );
    } else {
        console.log("failed to send event----");
    }
  };
console.log( "oldDoc---", oldDoc);

  return (
    <Box>
      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" onClick={()=>handleNavigate(1)}>
          Navigate Iframe
        </Button>
        <Button variant="contained" onClick={handleShowOld}>
          Show Old Document
        </Button>
        <Button variant="contained" onClick={()=>handleSendEvent(0)}>
          Send Foo Event
        </Button>
      </Stack>
      <Box ref={iframeRef} />
    </Box>
  );
};

export default MemoryLeak;
