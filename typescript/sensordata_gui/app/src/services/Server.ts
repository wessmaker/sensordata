import { ConnectionStatus } from "../utils/Connections.ts";
import ConnectionDetails from "../types/ConnectionDetails.ts";
import { Topic } from "../types/Topic.ts";

const serverDetails: ConnectionDetails = {
  // TODO Add dynamic import from default value json file
  IP: "localhost",
  port: "3002",
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
