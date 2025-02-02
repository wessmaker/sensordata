import React, { useState } from "react";
import LayoutContainer from "./components/LayoutContainer.tsx";
import { Marker } from "./components/markers/Marker.tsx";
import { RefreshButton } from "./components/RefreshButton.tsx";
import { connectBroker, subscribe } from "./services/MQTT.ts";
function App() {
  connectBroker();
  setTimeout(() => {
    console.log("NOW IT RUNS THE NEW TOPICS");
    subscribe({ path: "/test/testings" });
  }, 2000);
  return (
    <>
      <LayoutContainer></LayoutContainer>
    </>
  );
}

export default App;
