import {
  ConnectedGreen,
  ConnectingYellow,
  DisconnectedRed,
  UnknownGray,
} from "./Colors.ts";

enum ConnectionStatus {
  DISCONNECTED,
  CONNECTED,
  CONNECTING,
  UNKNOWN,
}
interface ConnectionDetails {
  IP: string;
  port: string;
  connectionStatus: ConnectionStatus;
}

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

export { ConnectionStatus, ConnectionDetails, getStatusColor, getStatusText };
