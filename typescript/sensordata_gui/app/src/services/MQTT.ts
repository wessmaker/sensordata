import PahoMQTT, {
  OnFailureCallback,
  OnSubscribeSuccessCallback,
  OnSuccessCallback,
} from "paho-mqtt";
import mqttBrokerOptions from "../json/mqttBrokerOptions.json";

import { Topic } from "../types/Topic";
import { ConnectionStatus, getStatusText } from "../utils/Connections.ts";
import ConnectionOptions from "../types/ConnectionDetails.ts";

interface BrokerOptions extends ConnectionOptions {
  IP: string;
  port: string;
  clientID: string;
  username: string;
  password: string;
}

let brokerOptions: BrokerOptions = {
  IP: mqttBrokerOptions.IP,
  port: String(mqttBrokerOptions.wsPort),
  clientID: mqttBrokerOptions.clientID,
  username: mqttBrokerOptions.username,
  password: mqttBrokerOptions.password,
};

export const setBrokerIP = (IP: string) => {
  brokerOptions.IP = IP;
};

export const setBrokerPort = (port: string) => {
  brokerOptions.port = port;
};

export const getBrokerDetails = () => {
  return brokerOptions;
};

export const getBrokerConnectionStatus = () => {
  return client.isConnected()
    ? ConnectionStatus.CONNECTED
    : ConnectionStatus.DISCONNECTED;
};

let client = new PahoMQTT.Client(
  getBrokerDetails().IP,
  Number.parseInt(getBrokerDetails().port),
  getBrokerDetails().clientID
);

const onConnection = () => {
  console.log("MQTT CLIENT CONNECTED TO " + client.host + ", " + client.port);
};

const onConnectionFail = () => {
  console.log("MQTT CONNECTION FAILED TO: " + client.host + ", " + client.port);
};

const connectionCredentials: PahoMQTT.ConnectionOptions = {
  onSuccess: onConnection,
  onFailure: onConnectionFail,
  userName: getBrokerDetails().username,
  password: getBrokerDetails().password,
  reconnect: true,
  timeout: 10,
};

export const connectBroker = () => {
  client = new PahoMQTT.Client(
    getBrokerDetails().IP,
    Number.parseInt(getBrokerDetails().port),
    getBrokerDetails().clientID
  );
  try {
    console.log(
      "Connecting to broker with : " + client.host + ", " + client.port
    );

    client.connect(connectionCredentials);
  } catch (error) {
    console.log("Error happened when connecting to MQTT broker: " + error);
  } finally {
    console.log("CONNECTING TO BROKER ENDING");
  }
};

client.onConnectionLost = (error: PahoMQTT.MQTTError) => {
  console.log(
    "Lost connection to MQTT broker, errorcode: " +
      error.errorCode +
      ", errorMessage: " +
      error.errorMessage
  );
};

export const disconnectBroker = () => {
  if (client.isConnected()) {
    client.disconnect();
    console.log("Disconnecting MQTT");
  }
};

const onSubscriptionSuccess = () => {
  console.log("Subscription success!");
};

const onSubscriptionFail = () => {
  console.log("Subscription failed!");
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

export const publish = (topic: string, payload: string, retained?: boolean) => {
  client.send(topic, payload, 0, retained);
};

export const fetchBroker = () => {
  console.log("FETCHING BROKER");
  if (client.isConnected()) disconnectBroker();
  connectBroker();
};
