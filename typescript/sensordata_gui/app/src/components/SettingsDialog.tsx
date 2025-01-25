import React, { useState } from "react";

import "./common/Colors.ts";

import CloseIcon from "../img/closeicon.png";

import {
  DarkGray,
  LightGray,
  Orange,
  FontWhite,
  HoverOrange,
  FontBlack,
  HoverDarkGray,
  HoverLightGray,
} from "./common/Colors.ts";

import {
  fetchBroker,
  getBrokerDetails,
  setBrokerIP,
  setBrokerPort,
} from "./MQTT.ts";

import {
  fetchServer,
  getServerDetails,
  setServerIP,
  setServerPort,
} from "./Server.ts";

import {
  getStatusColor,
  getStatusText,
  ConnectionStatus,
} from "./common/Connections.ts";

function SettingsDialog({ isOpen, onCloseButtonClick }) {
  const [closeIconBg, setCloseIconBg] = useState(Orange);
  const [brokerStatusBg, setBrokerStatusBg] = useState(DarkGray);
  const [serverStatusBg, setServerStatusBg] = useState(DarkGray);
  const [serverStatusColor, setServerStatusColor] = useState(
    getStatusColor(getServerDetails().connectionStatus)
  );
  const [serverStatusText, setServerStatusText] = useState(
    getStatusText(getServerDetails().connectionStatus)
  );
  const [brokerStatusColor, setBrokerStatusColor] = useState(
    getStatusColor(getBrokerDetails().connectionStatus)
  );
  const [brokerStatusText, setBrokerStatusText] = useState(
    getStatusText(getBrokerDetails().connectionStatus)
  );
  const onServerStatusClick = () => {
    // const connectionStatus = fetchServer();
    // setServerStatusColor(getStatusColor(connectionStatus));
    // setServerStatusText(getStatusText(connectionStatus));
  };
  const onBrokerStatusClick = () => {
    const connectionStatus: ConnectionStatus = fetchBroker();
    setBrokerStatusColor(getStatusColor(connectionStatus));
    setBrokerStatusText(getStatusText(connectionStatus));
  };

  if (!isOpen) return null;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 750,
        top: 400,
      }}
    >
      <div
        className="Background"
        style={{
          width: 544,
          height: 267,
          left: 0,
          top: 0,
          position: "absolute",
          background: DarkGray,
          borderRadius: 10,
        }}
      />
      <div
        className="SettingsContainer"
        style={{
          width: 538,
          height: 261,
          left: 3,
          top: 3,
          position: "absolute",
          background: LightGray,
          borderRadius: 10,
        }}
      />
      <div
        className="CloseIconContainerContainer"
        style={{
          width: 64,
          height: 64,
          left: 480,
          top: 0,
          position: "absolute",
          background: DarkGray,
          borderBottomLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <div
        className="CloseIconContainer"
        style={{
          width: 56,
          height: 56,
          left: 485,
          top: 4,
          position: "absolute",
          background: closeIconBg,
          borderRadius: 10,
        }}
        onMouseEnter={() => setCloseIconBg(HoverOrange)}
        onMouseLeave={() => setCloseIconBg(Orange)}
        onClick={() => {
          setCloseIconBg(Orange);
          onCloseButtonClick();
        }}
      />
      <img
        className="CloseIcon"
        style={{
          width: 56,
          height: 56,
          left: 485,
          top: 4,
          position: "absolute",
        }}
        src={CloseIcon}
        onMouseEnter={() => setCloseIconBg(HoverOrange)}
        onMouseLeave={() => setCloseIconBg(Orange)}
        onClick={() => {
          setCloseIconBg(Orange);
          onCloseButtonClick();
        }}
      />
      <div
        className="BrokerText"
        style={{
          width: 70,
          height: 30,
          left: 50,
          top: 39,
          position: "absolute",
          textAlign: "center",
          color: FontWhite,
          fontSize: 18,
          fontFamily: "Arial",
          fontWeight: "bold",
          wordWrap: "break-word",
        }}
      >
        Broker
      </div>
      <div
        className="ServerText"
        style={{
          width: 70,
          height: 30,
          left: 298,
          top: 39,
          position: "absolute",
          textAlign: "center",
          color: FontWhite,
          fontSize: 18,
          fontFamily: "Arial",
          fontWeight: "bold",
          wordWrap: "break-word",
        }}
      >
        Server
      </div>
      <div
        className="BrokerIPText"
        style={{
          width: 50,
          height: 30,
          left: 44,
          top: 85,
          position: "absolute",
          textAlign: "right",
          color: FontWhite,
          fontSize: 16,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
      >
        IP
      </div>
      <div
        className="BrokerPortText"
        style={{
          width: 50,
          height: 30,
          left: 44,
          top: 131,
          position: "absolute",
          textAlign: "right",
          color: FontWhite,
          fontSize: 16,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
      >
        Port
      </div>
      <div
        className="ServerIPText"
        style={{
          width: 50,
          height: 30,
          left: 292,
          top: 85,
          position: "absolute",
          textAlign: "right",
          color: FontWhite,
          fontSize: 16,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
      >
        IP
      </div>
      <div
        className="ServerPortText"
        style={{
          width: 50,
          height: 30,
          left: 292,
          top: 131,
          position: "absolute",
          textAlign: "right",
          color: FontWhite,
          fontSize: 16,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
      >
        Port
      </div>
      <input
        className="BrokerIPInput"
        defaultValue={getBrokerDetails().IP}
        style={{
          width: 140,
          height: 15,
          left: 102,
          top: 84,
          position: "absolute",
          textAlign: "left",
          color: FontBlack,
          fontSize: 15,
          fontFamily: "Arial",
        }}
        onChange={(e) => setBrokerIP(e.target.value)}
      ></input>

      <input
        className="BrokerPortInput"
        defaultValue={getBrokerDetails().port}
        style={{
          width: 140,
          height: 15,
          left: 102,
          top: 130,
          position: "absolute",
          textAlign: "left",
          color: FontBlack,
          fontSize: 15,
          fontFamily: "Arial",
        }}
        onChange={(e) => setBrokerPort(e.target.value)}
      ></input>

      <input
        className="ServerIPInput"
        defaultValue={getServerDetails().IP}
        style={{
          width: 140,
          height: 15,
          left: 350,
          top: 84,
          position: "absolute",
          textAlign: "left",
          color: FontBlack,
          fontSize: 15,
          fontFamily: "Arial",
        }}
        onChange={(e) => setServerIP(e.target.value)}
      ></input>

      <input
        className="ServerPortInput"
        defaultValue={getServerDetails().port}
        style={{
          width: 140,
          height: 15,
          left: 350,
          top: 130,
          position: "absolute",
          textAlign: "left",
          color: FontBlack,
          fontSize: 15,
          fontFamily: "Arial",
        }}
        onChange={(e) => setServerPort(e.target.value)}
      ></input>
      <div
        className="BrokerStatusContainer"
        style={{
          width: 160,
          height: 30,
          left: 94,
          top: 203,
          position: "absolute",
          background: brokerStatusBg,
          borderRadius: 20,
        }}
        onMouseEnter={() => setBrokerStatusBg(HoverDarkGray)}
        onMouseLeave={() => setBrokerStatusBg(DarkGray)}
        onClick={() => {
          console.log(getBrokerDetails().IP, getBrokerDetails().port);
          onBrokerStatusClick();
          setBrokerStatusBg(DarkGray);
        }}
      />
      <div
        className="BrokerStatusText"
        style={{
          width: 160,
          height: 30,
          left: 94,
          top: 209,
          position: "absolute",
          textAlign: "center",
          color: brokerStatusColor,
          fontSize: 16,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
        onMouseEnter={() => setBrokerStatusBg(HoverDarkGray)}
        onMouseLeave={() => setBrokerStatusBg(DarkGray)}
        onClick={() => {
          console.log(getBrokerDetails().IP, getBrokerDetails().port);
          onBrokerStatusClick();
          setBrokerStatusBg(DarkGray);
        }}
      >
        {brokerStatusText}
      </div>
      <div
        className="ServerStatusContainer"
        style={{
          width: 160,
          height: 30,
          left: 342,
          top: 203,
          position: "absolute",
          background: serverStatusBg,
          borderRadius: 20,
        }}
        onMouseEnter={() => setServerStatusBg(HoverDarkGray)}
        onMouseLeave={() => setServerStatusBg(DarkGray)}
        onClick={() => {
          console.log(serverIP);
          onServerStatusClick();
          setServerStatusBg(DarkGray);
        }}
      />
      <div
        className="ServerStatusText"
        style={{
          width: 160,
          height: 30,
          left: 342,
          top: 209,
          position: "absolute",
          textAlign: "center",
          color: serverStatusColor,
          fontSize: 16,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
        onMouseEnter={() => setServerStatusBg(HoverDarkGray)}
        onMouseLeave={() => setServerStatusBg(DarkGray)}
        onClick={() => {
          console.log(
            "Server IP " + getServerDetails().IP,
            "Server PORT " + getServerDetails().port
          );

          onServerStatusClick();
          setServerStatusBg(DarkGray);
        }}
      >
        {serverStatusText}
      </div>
    </div>
  );
}

export default SettingsDialog;
