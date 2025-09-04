import React, { useRef, useState } from "react";
import MemoryLeak from "./MemoryLeak";

const MemoryLeakParent = () => {
  const containerRef = useRef(null);                  // visible container
  const hiddenPool = useRef(document.createDocumentFragment()); 
  const iframeCache = useRef(new Map());              // itemId → { iframe, doc }
  const [selectedId, setSelectedId] = useState(null);

  return (
    <MemoryLeak
      containerRef={containerRef}
      hiddenPool={hiddenPool}
      iframeCache={iframeCache}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
    />
  );
};

export default MemoryLeakParent;
