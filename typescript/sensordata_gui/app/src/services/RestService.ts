import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import endpoints from "../json/serverEndpoint.json";
import { Topic } from "../types/Topic";

const baseUrl: string = endpoints.baseUrl; //TODO Make this dynamic
const topicPath: string = endpoints.topics;

const client = axios.create({
  baseURL: baseUrl,
});

const getTopicsFromServer = async (): Promise<Topic[]> => {
  const topicPathList: Topic[] = [];
  try {
    const response = await client.get(baseUrl + topicPath, {
      headers: {
        Accept: "application/json",
      },
    });
    response.data.topics.forEach((loopedTopicPath) => {
      topicPathList.push({
        path: loopedTopicPath,
      });
    });
  } catch (error) {}
  return topicPathList;
};

const addTopicToServer = (topic: Topic) => {};
const removeTopicFromServer = (topic: Topic) => {};

export { getTopicsFromServer, addTopicToServer, removeTopicFromServer };
