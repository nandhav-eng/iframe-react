import React, { useEffect, useRef } from "react";

const IframeMemorySizeCheck = () => {
  const iframeCache = useRef(new Map());
  const containerRef = useRef(null);

  useEffect(() => {
    const iframes = Array.from({ length: 10 }).map((_, index) => {
      const id = index + 1;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.ameyo.com/?id=${id}`;
      iframe.style.width = "300px";
      iframe.style.height = "400px";
      iframe.style.border = "1px solid #ccc";
      iframe.style.margin = "8px";

      iframeCache.current.set(id, iframe);
      return iframe;
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      iframes.forEach((iframe) => containerRef.current.appendChild(iframe));
    }

    console.log("All iframes mounted in DOM:", iframeCache.current);
  }, []);

  return (
      <div style={{
        height:"100vh"
    }}>
      <h3>Iframe Memory Size Check</h3>
      <div
        ref={containerRef}
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}
      />
    </div>
  );
};

export default IframeMemorySizeCheck;
