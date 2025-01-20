export enum ConnectionStatus {
  DISCONNECTED = "DISCONNECTED",
  CONNECTED = "CONNECTED",
  CONNECTING = "CONNECTING",
}
type ConnectionDetails = {
  IP: String;
  port: String;
  connectionStatus: ConnectionStatus;
};

const brokerDetails: ConnectionDetails = {
  IP: "localhost",
  port: "1883",
  connectionStatus: ConnectionStatus.DISCONNECTED,
};
const serverDetails: ConnectionDetails = {
  IP: "localhost",
  port: "8101",
  connectionStatus: ConnectionStatus.CONNECTING,
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
export { getBrokerDetails, getServerDetails };
