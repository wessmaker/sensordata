package fi.wessmaker.sensordata.handler;

/**
 * Backend doesn't store the unsubscribed topics
 */
public class CustomTopic {
	
	private String path;
	private Object defaultValue;
	private boolean isRetained;
	private TopicType topicType;
	
	private enum TopicType {
		
		NUMERIC("numeric"), STRING("text");
		
		private String typeString;
		
		private TopicType(String typeString) {
			this.typeString = typeString;
		}
		
		@Override
		public String toString () {
			return this.typeString;
		}
		
	}
	
	public CustomTopic(String path, String defaultValue) {
		this.path = path;
		this.defaultValue = defaultValue;
		this.topicType = TopicType.STRING;
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
	
	public boolean isRetained () {
		return isRetained;
	}
	
	public void setRetained (boolean isRetained) {
		this.isRetained = isRetained;
	}
}
