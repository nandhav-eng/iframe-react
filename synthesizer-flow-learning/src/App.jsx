import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/Header";
import Body from "./components/Body";
import LoginPage from "./components/LoginPage";
import { Divider, Grid, Button, Box } from "@mui/material";
import SideBar from "./components/SideBar";
import { DnDProvider } from "./context/DNDContext";
import { ReactFlowProvider } from "@xyflow/react";
import { UtilsProvider } from "./context/UtilsContext";
import InteractionContainer from "./projects/interactions/InteractionContainer";
import IframeMemorySizeCheck from "./projects/interactions/iframe-memory-size-check/IframeMemorySizeCheck";
import IframeByGrokExample from "./projects/grok-example-check/IframeByGrokExample";
import MemoryLeak from "./projects/memory-leak-method/MemoryLeak";
import MemoryLeakParent from "./projects/memory-leak-method/MemoryLeakParent";
import IframeMultiAppConnect from "./projects/multiple-app-iframe-connect/InteractionContainer";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  if (true) {
    return <IframeMultiAppConnect/>
  }

  if (true) {
    return <InteractionContainer/>
  }

  return <MemoryLeakParent/>




 

  if (false) {
    return <MemoryLeakParent/>
  }

  if (true) {
    return <IframeMemorySizeCheck/>
  }



  if (true) {
    return <IframeByGrokExample/>
  }



 

  if (showLogin) {
    return (
      <div>
        <LoginPage />
        <Box sx={{ position: 'fixed', top: 20, right: 20 }}>
          <Button 
            variant="outlined" 
            onClick={() => setShowLogin(false)}
            sx={{ background: 'white', '&:hover': { background: '#f5f5f5' } }}
          >
            Go to Main App
          </Button>
        </Box>
      </div>
    );
  }

  return (
    <UtilsProvider>
      <ReactFlowProvider>
        <DnDProvider>
          <div>
            <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
              <Button 
                variant="contained" 
                onClick={() => setShowLogin(true)}
                sx={{ background: '#667eea', '&:hover': { background: '#5a6fd8' } }}
              >
                Back to Login
              </Button>
            </Box>
            <Grid container>
              <Grid size={12}>
                <Header />
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid size={{ xs: 12, sm: 2 }}>
                <SideBar />
              </Grid>

              <Grid size={{ xs: 0, sm: 10 }}>
                <Body />
              </Grid>
            </Grid>
          </div>
        </DnDProvider>
      </ReactFlowProvider>
    </UtilsProvider>
  );
}

export default App;
