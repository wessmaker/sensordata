// Interface that connects UI markers and MQTT topics
interface TopicDetails {
  path: string;
  value?: string;
  markerColor?: string;
  unit?: string;
  name?: string;
}

export { TopicDetails };
