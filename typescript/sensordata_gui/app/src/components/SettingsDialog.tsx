import React, { useEffect, useState } from "react";

import "../utils/Colors.ts";

import CloseIcon from "../assets/closeicon.png";

import {
  DarkGray,
  LightGray,
  Orange,
  FontWhite,
  HoverOrange,
  FontBlack,
  HoverDarkGray,
  HoverLightGray,
  UnknownGray,
  DisconnectedRed,
} from "../utils/Colors.ts";

import {
  connectBroker,
  disconnectBroker,
  fetchBroker,
  getBrokerDetails,
  setBrokerIP,
  setBrokerPort,
  getBrokerConnectionStatus,
} from "../services/MQTT.ts";

import {
  fetchServer,
  getServerConnectionStatus,
  getServerDetails,
  setServerIP,
  setServerPort,
} from "../services/Server.ts";

import {
  getStatusColor,
  getStatusText,
  ConnectionStatus,
} from "../utils/Connections.ts";

function SettingsDialog({ isOpen, onCloseButtonClick }) {
  const [brokerIPInput, setBrokerIPInput] = useState(getBrokerDetails().IP);
  const [brokerPortInput, setBrokerPortInput] = useState(
    getBrokerDetails().port
  );
  const [serverIPInput, setServerIPInput] = useState(getBrokerDetails().IP);
  const [serverPortInput, setServerPortInput] = useState(
    getServerDetails().port
  );
  const [closeIconBg, setCloseIconBg] = useState(Orange);
  const [brokerStatusBg, setBrokerStatusBg] = useState(DarkGray);
  const [serverStatusBg, setServerStatusBg] = useState(DarkGray);
  const [serverStatusColor, setServerStatusColor] = useState(
    getStatusColor(getServerConnectionStatus())
  );
  const [serverStatusText, setServerStatusText] = useState(
    getStatusText(getServerConnectionStatus())
  );
  const [brokerStatusColor, setBrokerStatusColor] = useState(
    getStatusColor(getBrokerConnectionStatus())
  );
  const [brokerStatusText, setBrokerStatusText] = useState(
    getStatusText(getBrokerConnectionStatus())
  );

  const onServerStatusClick = () => {
    fetchServer();
  };

  const onBrokerStatusClick = () => {
    if (
      getBrokerConnectionStatus() === ConnectionStatus.CONNECTED &&
      (getBrokerDetails().IP !== brokerIPInput ||
        getBrokerDetails().port !== brokerPortInput)
    ) {
      setBrokerIP(brokerIPInput);
      setBrokerPort(brokerPortInput);
      fetchBroker();
    }
    if (getBrokerConnectionStatus() === ConnectionStatus.DISCONNECTED) {
      setBrokerIP(brokerIPInput);
      setBrokerPort(brokerPortInput);
      connectBroker();
    }
  };
  setInterval(() => {
    setBrokerStatusText(getStatusText(getBrokerConnectionStatus()));
    setBrokerStatusColor(getStatusColor(getBrokerConnectionStatus()));
    setServerStatusText(getStatusText(getServerConnectionStatus()));
    setServerStatusColor(getStatusColor(getServerConnectionStatus()));
  }, 1000);

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
          boxShadow: "0 0 5px black",
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
        alt="icon"
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
        defaultValue={brokerIPInput}
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
        onChange={(e) => {
          setBrokerIPInput(e.target.value);

          if (getBrokerConnectionStatus() === ConnectionStatus.CONNECTED) {
            disconnectBroker();
            setBrokerStatusColor(getStatusColor(getBrokerConnectionStatus()));
            setBrokerStatusText(getStatusText(getBrokerConnectionStatus()));
          }
        }}
      ></input>

      <input
        className="BrokerPortInput"
        defaultValue={brokerPortInput}
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
        onChange={(e) => {
          setBrokerPortInput(e.target.value);
          if (getBrokerConnectionStatus() === ConnectionStatus.CONNECTED) {
            disconnectBroker();
            setBrokerStatusColor(getStatusColor(getBrokerConnectionStatus()));
            setBrokerStatusText(getStatusText(getBrokerConnectionStatus()));
          }
        }}
      ></input>

      <input
        className="ServerIPInput"
        defaultValue={serverIPInput}
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
        onChange={(e) => {
          setServerIPInput(e.target.value);
        }}
      ></input>

      <input
        className="ServerPortInput"
        defaultValue={serverPortInput}
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
        onChange={(e) => {
          setServerPortInput(e.target.value);
        }}
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
          cursor: "default",
        }}
        onMouseEnter={() => setBrokerStatusBg(HoverDarkGray)}
        onMouseLeave={() => setBrokerStatusBg(DarkGray)}
        onClick={() => {
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
          cursor: "default",
        }}
        onMouseEnter={() => setServerStatusBg(HoverDarkGray)}
        onMouseLeave={() => setServerStatusBg(DarkGray)}
        onClick={() => {
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
