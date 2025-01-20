import React, { useState } from "react";
import "reactjs-popup";
import "./common/Colors.ts";
import CloseIcon from "../img/closeicon.png";
import "./common/ConnectionStatus.ts";
import {
  ConnectionStatus,
  getBrokerDetails,
  getServerDetails,
} from "./common/ConnectionStatus.ts";
import {
  ConnectedGreen,
  ConnectingYellow,
  DisconnectedRed,
} from "./common/Colors.ts";

const getStatusAsColor = (status: ConnectionStatus) => {
  switch (status) {
    case ConnectionStatus.CONNECTED:
      return ConnectedGreen;
    case ConnectionStatus.DISCONNECTED:
      return DisconnectedRed;
    case ConnectionStatus.CONNECTING:
      return ConnectingYellow;
  }
};

function SettingsDialog() {
  //Add some checking to this to update to correct color when connectionstatus changes
  const onServerStatusClick = () => {
    console.log("SERVER STATUS CLICK");
    setServerStatusColor(getStatusAsColor(getServerDetails().connectionStatus));
  };
  const onBrokerStatusClick = () => {
    console.log("BROKER STATUS CLICK");
    setServerStatusColor(getStatusAsColor(getServerDetails().connectionStatus));
  };
  const [serverStatusColor, setServerStatusColor] = useState(DisconnectedRed);
  const [brokerStatusColor, setBrokerStatusColor] = useState(DisconnectedRed);
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        className="Background"
        style={{
          width: 544,
          height: 267,
          left: 0,
          top: 0,
          position: "absolute",
          background: "#252525",
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
          background: "#434343",
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
          background: "#252525",
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
          background: "#FF6709",
          borderRadius: 10,
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
      />
      <div
        className="BrokerText"
        style={{
          width: 70,
          height: 30,
          left: 24,
          top: 39,
          position: "absolute",
          textAlign: "right",
          color: "white",
          fontSize: 15,
          fontFamily: "Arial",
          fontWeight: "500",
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
          left: 272,
          top: 39,
          position: "absolute",
          textAlign: "right",
          color: "white",
          fontSize: 15,
          fontFamily: "Arial",
          fontWeight: "500",
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
          color: "white",
          fontSize: 12,
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
          color: "white",
          fontSize: 12,
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
          color: "white",
          fontSize: 12,
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
          color: "white",
          fontSize: 12,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
      >
        Port
      </div>
      <div
        className="BrokerStatusContainer"
        style={{
          width: 160,
          height: 30,
          left: 94,
          top: 203,
          position: "absolute",
          background: "#252525",
          borderRadius: 20,
        }}
        onClick={onBrokerStatusClick}
      />
      <div
        className="BrokerStatusText"
        style={{
          width: 160,
          height: 30,
          left: 94,
          top: 210,
          position: "absolute",
          textAlign: "center",
          color: brokerStatusColor,
          fontSize: 14,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
        onClick={onBrokerStatusClick}
      >
        {getBrokerDetails().connectionStatus}
      </div>
      <div
        className="ServerStatusContainer"
        style={{
          width: 160,
          height: 30,
          left: 342,
          top: 203,
          position: "absolute",
          background: "#252525",
          borderRadius: 20,
        }}
        onClick={onServerStatusClick}
      />
      <div
        className="ServerStatusText"
        style={{
          width: 160,
          height: 30,
          left: 342,
          top: 210,
          position: "absolute",
          textAlign: "center",
          color: serverStatusColor,
          fontSize: 14,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
        onClick={onServerStatusClick}
      >
        {getServerDetails().connectionStatus}
      </div>
    </div>
  );
}

export default SettingsDialog;
