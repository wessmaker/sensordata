import React, { useState } from "react";
import "./App.css";
import LayoutContainer from "./components/LayoutContainer.tsx";
import { initMQTTConnection } from "./services/MQTT.ts";
import { getTopicsFromServer } from "./services/RestService.ts";
function App() {
  // console.log(getTopicsFromServer());
  initMQTTConnection();
  console.log(getTopicsFromServer());
  return (
    <>
      <LayoutContainer></LayoutContainer>
    </>
  );
}

export default App;
