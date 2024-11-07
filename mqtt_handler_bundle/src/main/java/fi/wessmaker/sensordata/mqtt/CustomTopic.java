package fi.wessmaker.sensordata.mqtt;

public class CustomTopic {
	private String topicPath;
	private String value;
	private TopicType topicType;
	
	public CustomTopic(String topicPath, TopicType topicType) {
		this.topicPath = topicPath;
		this.topicType = topicType;
	}
	
	public String getPath () {
		return this.topicPath;
	}
	
	public String getValue () {
		return this.value;
	}
	
	public TopicType getType () {
		return this.topicType;
	}
}
