import { ConnectionStatus } from "../utils/Connections.ts";
import ConnectionOptions from "../types/ConnectionDetails.ts";
import { TopicDetails } from "../types/TopicDetails.ts";

let connection: boolean = false;

const serverDetails: ConnectionOptions = {
  // TODO Add dynamic import from default value json file
  IP: "localhost",
  port: "3002",
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

const getServerConnectionStatus = () => {
  return connection
    ? ConnectionStatus.CONNECTED
    : ConnectionStatus.DISCONNECTED;
};

/**
 * Fetches backend server and returns the result of the connection after finishing processing
 * @returns CONNECTED | DISCONNECTED | CONNECTING | UNKOWN
 */
const fetchServer = (): ConnectionStatus => {
  return getServerConnectionStatus();
};

export {
  setServerIP,
  setServerPort,
  getServerDetails,
  fetchServer,
  getServerConnectionStatus,
};
