import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import endpoints from "../json/serverEndpoint.json";
import { TopicDetails } from "../types/TopicDetails.ts";
import {
  getBrokerConnectionStatus,
  getTopicDetailList,
  subscribe,
} from "./MQTT.ts";
import { ConnectionStatus } from "../utils/Connections.ts";

const baseUrl: string = endpoints.baseUrl; //TODO Make this dynamic
const topicPath: string = endpoints.topics;

const client = axios.create({
  baseURL: "localhost",
});

const refreshTopics = async () => {
  if (getBrokerConnectionStatus() === ConnectionStatus.DISCONNECTED) {
    console.log(
      "ERROR: Not refreshing topics due to broker being disconnected!"
    );
    return;
  }
  let newTopics: TopicDetails[] = [];
  try {
    const response = await client.get(baseUrl + topicPath, {
      headers: {
        Accept: "application/json",
      },
    });

    Array(...response.data.topics).map((newPath) => {
      let topicExsists: boolean = false;
      //Check if topic already exists
      for (var i = 0; i < getTopicDetailList().length; i++) {
        if (newPath == getTopicDetailList()[i].path) topicExsists = true;
      }
      //Add topic to list
      if (!topicExsists) {
        let topic: TopicDetails = {
          path: newPath,
        };
        newTopics.push(topic);
      }
      topicExsists = false;
    });
  } catch (error) {}
  //Subscribe all new topics and add to public list (inside subscibe())
  for (var topic of newTopics) {
    subscribe(topic);
  }
};

const addTopicToServer = (topic: TopicDetails) => {};
const removeTopicFromServer = (topic: TopicDetails) => {};

export { refreshTopics, addTopicToServer, removeTopicFromServer };
