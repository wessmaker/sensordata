import { ConnectedGreen, DisconnectedRed } from "../utils/Colors.ts";

enum ConnectionStatus {
  DISCONNECTED,
  CONNECTED,
}

const getStatusColor = (status: ConnectionStatus) => {
  switch (status) {
    case ConnectionStatus.CONNECTED:
      return ConnectedGreen;
    case ConnectionStatus.DISCONNECTED:
      return DisconnectedRed;
  }
};

const getStatusText = (status: ConnectionStatus) => {
  switch (status) {
    case ConnectionStatus.CONNECTED:
      return "CONNECTED";
    case ConnectionStatus.DISCONNECTED:
      return "DISCONNECTED";
  }
};

export { ConnectionStatus, getStatusColor, getStatusText };
