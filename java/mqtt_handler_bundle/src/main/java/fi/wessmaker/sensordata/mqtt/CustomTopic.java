package fi.wessmaker.sensordata.mqtt;

/**
 * Backend doesn't store the unsubscribed topics
 */
public class CustomTopic {
	private String path;
	private Object defaultValue;
	private TopicType topicType;
	
	private enum TopicType {
		NUMERIC, TEXT
	}
	
	public CustomTopic(String path, String defaultValue) {
		this.path = path;
		this.defaultValue = defaultValue;
		this.topicType = TopicType.TEXT;
	}
	
	public CustomTopic(String path, int defaultValue) {
		this.path = path;
		this.defaultValue = defaultValue;
		this.topicType = TopicType.NUMERIC;
	}
	
	
	public String getPath () {
		return path;
	}
	
	public Object getDefaultValue () {
		return defaultValue;
	}
	
	public TopicType getTopicType () {
		return topicType;
	}
	
}

