import {
  ConnectedGreen,
  ConnectingYellow,
  DisconnectedRed,
  UnknownGray,
} from "./Colors.ts";

export enum ConnectionStatus {
  DISCONNECTED,
  CONNECTED,
  CONNECTING,
  UNKNOWN,
}
type ConnectionDetails = {
  IP: String;
  port: String;
  connectionStatus: ConnectionStatus;
};

const brokerDetails: ConnectionDetails = {
  IP: "localhost",
  port: "1883",
  connectionStatus: ConnectionStatus.UNKNOWN,
};
const serverDetails: ConnectionDetails = {
  IP: "localhost",
  port: "8101",
  connectionStatus: ConnectionStatus.UNKNOWN,
};

const setServerIP = (IP: String) => {
  serverDetails.IP = IP;
};
const setBrokerIP = (IP: String) => {
  brokerDetails.IP = IP;
};
const setServerPort = (port: String) => {
  serverDetails.port = port;
};
const setBrokerPort = (port: String) => {
  brokerDetails.port = port;
};

const getBrokerDetails = () => {
  return brokerDetails;
};
const getServerDetails = () => {
  return serverDetails;
};

const getStatusColor = (status: ConnectionStatus) => {
  switch (status) {
    case ConnectionStatus.CONNECTED:
      return ConnectedGreen;
    case ConnectionStatus.DISCONNECTED:
      return DisconnectedRed;
    case ConnectionStatus.CONNECTING:
      return ConnectingYellow;
    case ConnectionStatus.UNKNOWN:
      return UnknownGray;
  }
};

const getStatusText = (status: ConnectionStatus) => {
  switch (status) {
    case ConnectionStatus.CONNECTED:
      return "CONNECTED";
    case ConnectionStatus.DISCONNECTED:
      return "DISCONNECTED";
    case ConnectionStatus.CONNECTING:
      return "CONNECTING";
    case ConnectionStatus.UNKNOWN:
      return "UNKNOWN";
  }
};

export { getBrokerDetails, getServerDetails, getStatusColor, getStatusText };
