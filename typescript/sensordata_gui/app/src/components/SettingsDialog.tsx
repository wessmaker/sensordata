import React, { useState } from "react";
import "reactjs-popup";
import "./common/Colors.ts";
import CloseIcon from "../img/closeicon.png";
import "./common/ConnectionStatus.ts";
import {
  getBrokerDetails,
  getServerDetails,
  getStatusColor,
  getStatusText,
} from "./common/ConnectionStatus.ts";
import { DarkGray, LightGray, Orange, FontWhite } from "./common/Colors.ts";

function SettingsDialog() {
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
    setServerStatusColor(getStatusColor(getServerDetails().connectionStatus));
    setServerStatusText(getStatusText(getServerDetails().connectionStatus));
  };
  const onBrokerStatusClick = () => {
    setBrokerStatusColor(getStatusColor(getBrokerDetails().connectionStatus));
    setBrokerStatusText(getStatusText(getBrokerDetails().connectionStatus));
  };
  const onCloseIconClick = () => {};

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
          background: Orange,
          borderRadius: 10,
        }}
        onClick={onCloseIconClick}
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
        onClick={onCloseIconClick}
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
          color: FontWhite,
          fontSize: 16,
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
          left: 272,
          top: 39,
          position: "absolute",
          textAlign: "right",
          color: FontWhite,
          fontSize: 16,
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
          fontSize: 13,
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
          fontSize: 13,
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
          fontSize: 13,
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
          fontSize: 13,
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
          background: DarkGray,
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
          top: 209,
          position: "absolute",
          textAlign: "center",
          color: brokerStatusColor,
          fontSize: 16,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
        onClick={onBrokerStatusClick}
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
          background: DarkGray,
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
          top: 209,
          position: "absolute",
          textAlign: "center",
          color: serverStatusColor,
          fontSize: 16,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
        onClick={onServerStatusClick}
      >
        {serverStatusText}
      </div>
    </div>
  );
}

export default SettingsDialog;
