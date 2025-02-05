import PahoMQTT, {
  OnFailureCallback,
  OnSubscribeSuccessCallback,
  OnSuccessCallback,
} from "paho-mqtt";
import mqttBrokerOptions from "../json/mqttBrokerOptions.json";

import { Topic } from "../types/Topic";
import { ConnectionStatus, getStatusText } from "../utils/Connections.ts";
import ConnectionOptions from "../types/ConnectionDetails.ts";
import { refreshTopics } from "./RestService.ts";

let topicList: Topic[] = []; //Every topic in the list are subscribed

export const getTopicList = (): Topic[] => {
  return topicList;
};

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
  refreshTopics();
};

const onConnectionFail = () => {};

const connectionCredentials: PahoMQTT.ConnectionOptions = {
  onSuccess: onConnection,
  onFailure: onConnectionFail,
  userName: getBrokerDetails().username,
  password: getBrokerDetails().password,
  reconnect: false, //This will create spam if TRUE
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
  } catch (error) {}
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
  }
};

const onSubscriptionSuccess = () => {};

const onSubscriptionFail = () => {};

export const subscribe = (topic: Topic) => {
  if (client.isConnected()) {
    try {
      client.subscribe(topic.path, {
        onSuccess: onSubscriptionSuccess,
        onFailure: onSubscriptionFail,
      });
      topicList.push(topic);
    } catch (error) {}
  }
};

export const unsubscribe = (
  topic: Topic,
  onSubscriptionSuccess?: OnSuccessCallback,
  onSubscriptionFail?: OnFailureCallback
) => {
  try {
    client.unsubscribe(topic.path, {
      onSuccess: onSubscriptionSuccess,
      onFailure: onSubscriptionFail,
    });
    topicList.forEach((loopedTopic) => {
      if (loopedTopic.path === topic.path)
        topicList.splice(topicList.indexOf(loopedTopic), 1);
    });
  } catch (error) {}
};

export const publish = (topic: string, payload: string, retained?: boolean) => {
  client.send(topic, payload, 0, retained);
};

export const fetchBroker = () => {
  if (client.isConnected()) disconnectBroker();
  connectBroker();
};
