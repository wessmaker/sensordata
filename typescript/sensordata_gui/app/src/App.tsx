import React, { useState } from "react";
import LayoutContainer from "./components/LayoutContainer.tsx";
import { connectBroker } from "./services/MQTT.ts";
import { getTopicsFromServer } from "./services/RestService.ts";
import { Marker } from "./components/Marker.tsx";
function App() {
  // console.log(getTopicsFromServer());
  connectBroker();
  console.log(getTopicsFromServer());
  return (
    <>
      <Marker visible={true} name={""} value={""}></Marker>
      {/* <LayoutContainerContainer> */}
    </>
  );
}

export default App;
