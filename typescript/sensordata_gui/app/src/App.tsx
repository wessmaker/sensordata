import React, { useState } from "react";
import LayoutContainer from "./components/LayoutContainer.tsx";
import { connectBroker } from "./services/MQTT.ts";
import { getTopicsFromServer } from "./services/RestService.ts";
function App() {
  // console.log(getTopicsFromServer());
  connectBroker();
  console.log(getTopicsFromServer());
  return (
    <>
      <LayoutContainer></LayoutContainer>
    </>
  );
}

export default App;
