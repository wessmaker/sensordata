import { ConnectionDetails, ConnectionStatus } from "./common/Connections.ts";
import mqtt from "mqtt";

const connectionOptions = {
  keepalive: 60,
  clientId: "frontendtest",
  protocol: "MQTT",
  protocolVersion: 5,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 60000,
  username: "",
  password: "",
};

interface BrokerDetails extends ConnectionDetails {
  IP: string;
  port: string;
  connectionStatus: ConnectionStatus;
  options;
}

const brokerDetails: BrokerDetails = {
  IP: "127.0.0.1",
  port: "8083",
  connectionStatus: ConnectionStatus.UNKNOWN,
  options: connectionOptions,
};

const setBrokerIP = (IP: string) => {
  brokerDetails.IP = IP;
};

const setBrokerPort = (port: string) => {
  brokerDetails.port = port;
};

const getBrokerDetails = () => {
  return brokerDetails;
};

const client = mqtt.connect("mqtt://localhost"); //Doesn't work yet

client.on("connect", function () {});

client.on("message", function (topic, payload) {});

/**
 * Fetches MQTT broker and returns the result of the connection after finishing processing
 * @returns CONNECTED | DISCONNECTED | CONNECTING | UNKOWN
 */
const fetchBroker = (): ConnectionStatus => {
  let result: ConnectionStatus = ConnectionStatus.UNKNOWN;
  //TODO: Implement
  return result;
};

export { fetchBroker, getBrokerDetails, setBrokerIP, setBrokerPort };
