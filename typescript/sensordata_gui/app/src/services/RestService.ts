import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import endpoints from "../json/serverEndpoint.json";
import testTopicPAths from "../json/testtopics.json"; //FOR TESTING PURPOSES
import { Topic } from "../types/Topic";
import { getBrokerConnectionStatus, getTopicList, subscribe } from "./MQTT.ts";
import { ConnectionStatus } from "../utils/Connections.ts";

const baseUrl: string = endpoints.baseUrl; //TODO Make this dynamic
const topicPath: string = endpoints.topics;
const testingTopics = testTopicPAths.topics; //FOR TESTING PURPOSES

const client = axios.create({
  baseURL: "localhost",
});

const refreshTopics = async () => {
  if (getBrokerConnectionStatus() === ConnectionStatus.DISCONNECTED) return;
  let newTopics: Topic[] = [];
  try {
    const response = await client.get("http://localhost:3002/topics", {
      headers: {
        Accept: "application/json",
      },
    });
    Array(...response.data.topics).map((newPath) => {
      let exists: boolean = false;
      for (var i = 0; i < getTopicList().length; i++) {
        if (newPath == getTopicList()[i].path) exists = true;
      }
      if (!exists) {
        let topic: Topic = {
          path: newPath,
        };
        newTopics.push(topic);
      }
      exists = false;
    });
    console.log(getTopicList());
  } catch (error) {
    console.log("Error happened when fetching topics from server: " + error);
  }
  for (var topic of newTopics) {
    subscribe(topic);
  }
};

const addTopicToServer = (topic: Topic) => {};
const removeTopicFromServer = (topic: Topic) => {};

export { refreshTopics, addTopicToServer, removeTopicFromServer };
