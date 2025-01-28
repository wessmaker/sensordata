import PahoMQTT, {
  OnFailureCallback,
  OnSubscribeSuccessCallback,
  OnSuccessCallback,
} from "paho-mqtt";

import { Topic } from "../types/Topic";
import { ConnectionStatus } from "../utils/Connections.ts";
import ConnectionDetails from "../types/ConnectionDetails.ts";

interface BrokerDetails extends ConnectionDetails {
  IP: string;
  port: string;
  clientID: string;
  username: string;
  password: string;
  connectionStatus: ConnectionStatus;
  topics?: Topic[] | (() => Topic[]);
}

let brokerDetails: BrokerDetails = {
  IP: "127.0.0.1",
  port: "8083",
  connectionStatus: ConnectionStatus.UNKNOWN,
  clientID: "testingfrontend",
  username: "admin",
  password: "public",
  // topics: () => {},
};

export const setBrokerIP = (IP: string) => {
  brokerDetails.IP = IP;
};

export const setBrokerPort = (port: string) => {
  brokerDetails.port = port;
};

export const getBrokerDetails = () => {
  return brokerDetails;
};

const onConnection = () => {
  brokerDetails.connectionStatus = ConnectionStatus.CONNECTED;
  console.log("MQTT CLIENT HAS BEEN CONNECTED TO BROKER");
};

const onConnectionFail = () => {
  brokerDetails.connectionStatus = ConnectionStatus.DISCONNECTED;
  console.log("MQTT CONNECTION TO BROKER FAILED");
};

const onDisconnect = () => {};

const onSubscriptionSuccess = () => {
  console.log("Subscription success!");
};

const onSubscriptionFail = () => {
  console.log("Subscription failed!");
};

export const initMQTTConnection = () => {
  connectBroker();
};

const client = new PahoMQTT.Client(
  getBrokerDetails().IP,
  Number.parseInt(getBrokerDetails().port),
  getBrokerDetails().clientID
);
client.onConnectionLost = () => {
  brokerDetails.connectionStatus = ConnectionStatus.DISCONNECTED;
};

export const connectBroker = () => {
  client.connect({
    onSuccess: onConnection,
    onFailure: onConnectionFail,
    useSSL: false,
    userName: getBrokerDetails().username,
    password: getBrokerDetails().password,
    keepAliveInterval: 120,
    timeout: 15,
    reconnect: true,
  });
};

export const disconnectBroker = () => {
  client.disconnect();
};

export const publish = (topic: string, payload: string, retained?: boolean) => {
  client.send(topic, payload, 0, retained);
};

export const subscribe = (
  topic: Topic,
  onSubscriptionSuccess?: OnSubscribeSuccessCallback,
  onSubscriptionFail?: OnFailureCallback
) => {
  client.subscribe(topic.path, {
    onSuccess: onSubscriptionSuccess,
    onFailure: onSubscriptionFail,
  });
};

export const unsubscribe = (
  topic: Topic,
  onSubscriptionSuccess?: OnSuccessCallback,
  onSubscriptionFail?: OnFailureCallback
) => {
  client.unsubscribe(topic.path, {
    onSuccess: onSubscriptionSuccess,
    onFailure: onSubscriptionFail,
  });
};

/**
 * Fetches MQTT broker and returns the result of the connection after finishing processing
 * @returns CONNECTED | DISCONNECTED | CONNECTING | UNKOWN
 */
export const fetchBroker = (): ConnectionStatus => {
  const result: ConnectionStatus = ConnectionStatus.UNKNOWN;
  return result;
};
