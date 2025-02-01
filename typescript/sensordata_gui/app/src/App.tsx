import React, { useState } from "react";
import LayoutContainer from "./components/LayoutContainer.tsx";
import { connectBroker } from "./services/MQTT.ts";
import { getTopicsFromServer } from "./services/RestService.ts";
import { Marker } from "./components/markers/Marker.tsx";
import { RefreshButton } from "./components/RefreshButton.tsx";
function App() {
  // console.log(getTopicsFromServer());
  // connectBroker();
  // console.log(getTopicsFromServer());

  return (
    <>
      <LayoutContainer></LayoutContainer>
    </>
  );
}

export default App;
