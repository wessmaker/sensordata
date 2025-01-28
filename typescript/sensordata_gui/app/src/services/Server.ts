import { ConnectionStatus } from "../utils/Connections.ts";
import ConnectionDetails from "../types/ConnectionDetails.ts";
import { Topic } from "../types/Topic.ts";
import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import endpoints from "../json/serverEndpoint.json";

const baseUrl: string = endpoints.baseUrl; //TODO Make this no hard-coded
const topicPath: string = endpoints.topics;

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

const client = axios.create({
  baseURL: baseUrl,
});

/**
 * Fetches backend server and returns the result of the connection after finishing processing
 * @returns CONNECTED | DISCONNECTED | CONNECTING | UNKOWN
 */
const fetchServer = (): ConnectionStatus => {
  let result: ConnectionStatus = ConnectionStatus.UNKNOWN;
  return result;
};

const getTopicsFromServer = async (): Promise<Topic[]> => {
  const response = await client.get(baseUrl + topicPath, {
    headers: {
      Accept: "application/json",
    },
  });
  const topicPathList: Topic[] = [];
  response.data.topics.forEach((loopedTopicPath) => {
    topicPathList.push({
      path: loopedTopicPath,
    });
  });
  return topicPathList;
};

const addTopicToServer = (topic: Topic) => {};
const removeTopicFromServer = (topic: Topic) => {};

export {
  setServerIP,
  setServerPort,
  getServerDetails,
  fetchServer,
  getTopicsFromServer,
};
