import React, { useRef } from 'react'

const IframeByGrokExample = () => {

    const iframeCache = useRef(new Map())
    let currentItemId = null;
    const containerRef = useRef(null);

    const interactions = [
        { id: "1", name: "Interaction 1" },
        { id: "2", name: "Interaction 2" },
        { id: "3", name: "Interaction 3" },
        { id: "4", name: "Interaction 4" },
        { id: "5", name: "Interaction 5" },
      ];

async function switchToItem(newItemId, url) {
//     if (currentItemId && iframeCache.current.has(currentItemId)) {
      
//         const prevIframe = iframeCache.current.get(currentItemId);
//       console.log("in---", prevIframe.contentWindow);
        
//     prevIframe.contentWindow.postMessage({ type: 'switchAway', data: 'Switching away' }, '*'); // Or dispatchEvent
//   }

    let newIframe = iframeCache.current.get(newItemId);
    console.log("new --", newIframe, "cache", iframeCache );
    
    if (!newIframe) {
      
    newIframe = document.createElement('iframe');
      newIframe.src = url;
      newIframe.style.width = "300px";
      newIframe.style.height = "400px";
    document.body.appendChild(newIframe); // Temp append to load
    await new Promise(resolve => newIframe.onload = resolve);
    document.body.removeChild(newIframe);
        iframeCache.current.set(newItemId, newIframe);    
  }

  // Append to visible container (e.g., document.getElementById('container').appendChild(newIframe)
    currentItemId = newItemId;    
}
    
    console.log("contRef", containerRef, "cache", iframeCache)
  return (
    <div style={{
          height: "100vh",
        display:"flex"
    }}>
          {/* <h3>Iframe by Cache</h3> */}
          <div>
              {
                  interactions.map((interaction) => {
                      return <div style={{
                          padding: "8px",
                          border: "1px solid gray"
                      }}
                          onClick={() => {
                            switchToItem(interaction.id, "https://www.ameyo.com/?userId=moh3&userName=moh3&sessionId=Bearer%20eyJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJhbWV5byIsInN1YiI6IntcImFwcEluc3RhbmNlSWRcIjpcIkFwcC1TZXJ2ZXIteEpqbVZoZ1R1TVwiLFwiYXV0aF90eXBlXCI6XCJhdXRoLnR5cGUuand0XCIsXCJyZWZlcmVuY2VUYWdcIjpcImJXOW9Ndz09XCIsXCJjY0lkXCI6XCI1XCIsXCJyZXF1ZXN0SWRcIjpcIlpEYzJNeTAyT0dJME4yTXhOaTF6WlhNdGJXOW9NeTFoY0hCSlpDMUJjSEF0VTJWeWRtVnlMWGhLYW0xV2FHZFVkVTB0YW01Rk0wbGFRazFpTm1wTVRHNXNjMUoyVkVKaFdUSjFRa3RNVlRCVVNXTmpRVXhZTm1oUlFtOXlUM1pqYjNRek1HZHJaVTA1WW5sNmJuVnVjRFJYTUV0bVNIZFdUamh0YzFCSVdFdEpNelJGWjNoM1FscEZaSFI1VkhoWE9XNHpXbkkyT0ROSVowSnBVR1JpTmxBMFRIWjZXblV0TlRJNFwiLFwicm9vdFwiOlwiZmFsc2VcIixcIndoaXRlbGlzdGVkRG9tYWluc1wiOlwiW11cIixcInJlZmVyZW5jZVR5cGVcIjpcIlJYaGxZM1YwYVhabFwiLFwiY29udGV4dElkXCI6XCI1XCIsXCJjbGllbnRfdHlwZVwiOlwiamF2YS51aS5jbGllbnRcIixcInJlZmVyZW5jZUlkXCI6XCJiVzlvTXc9PVwifSIsImV4cCI6MTc1NjgwNzEzNiwiaWF0IjoxNzU2ODA2NTM2fQ.ZOW8C9AhhqpHU3tYd_JUq6wGGz-o5cJ0DjfmCpOOcuS55YCJU10Uy6H0UIYSBwiok_s-UgRzJVjggVrMFZ5fvoqueo57yk2gO0I24fJif2oDPDG961lT5amsorBvwMbQMXq-irWAZgBQO8rcp8H_YE_6F2aIoe4QIGO8d4uIYZvodUVVc2f38QWkvKNRXOJlwV3rzlk9QnNstLgS8x7bYl-3OgbLxHWb1urn4kecweIE1NCbNu4dhWAtDXvwpyuwqzzTRFmrAoZITwnHf5b-YmjsqDefABRwfOmDN_niAKbr0MdoidDRDaAF815iCT7Xz5BYaidvgd-D0-lLyu8dcw&userType=Executive&campaignId=47%2C172&userCrtObjectIds=%5B%27d763-68b47c16-ses-moh3-appId-App-Server-xJjmVhgTuM-jnE3IZBMb6jLLnlsRvTBaY2uBKLU0TIccALX6hQBorOvcot30gkeM9byznunp4W0KfHwVN8msPHXKI34EgxwBZEdtyTxW9n3Zr683HgBiPdb6P4LvzZu-528-uce-moh3Awc4cYhI%406%2Cundefined%2C%27%5D#" )
                      }}
                      >{interaction.name}</div>
                  })
              }
          </div>
      {/* <div
        ref={containerRef}
        // style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}
      /> */}
    </div>
  )
}

export default IframeByGrokExample