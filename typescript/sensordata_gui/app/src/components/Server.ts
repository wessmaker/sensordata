import mqtt, { Client } from "mqtt";
import { ConnectionDetails, ConnectionStatus } from "./common/Connections.ts";

const serverDetails: ConnectionDetails = {
  IP: "localhost",
  port: "8101",
  connectionStatus: ConnectionStatus.UNKNOWN,
};
const setServerIP = (IP: string) => {
  serverDetails.IP = IP;
};

const setServerPort = (port: string) => {
  serverDetails.port = port;
};

const getServerDetails = () => {
  return serverDetails;
};

/**
 * Fetches backend server and returns the result of the connection after finishing processing
 * @returns CONNECTED | DISCONNECTED | CONNECTING | UNKOWN
 */
const fetchServer = (): ConnectionStatus => {
  let result: ConnectionStatus = ConnectionStatus.UNKNOWN;
  return result;
};

export { setServerIP, setServerPort, getServerDetails, fetchServer };
