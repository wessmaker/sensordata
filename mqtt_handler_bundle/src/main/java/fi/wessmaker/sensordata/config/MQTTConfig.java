package fi.wessmaker.sensordata.config;

import java.time.LocalDateTime;
import java.util.ArrayList;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * MQTTConfig is used to store the configuration of current setup and write it to JSON file
 */
public class MQTTConfig {
	
	private static MQTTConfig mqttConfig = new MQTTConfig();
	private ArrayList<String> knownIPs = new ArrayList<>();
	private ArrayList<String> knownTopicPaths = new ArrayList<>();
	private String lastUpdated;
	
	public static MQTTConfig getConfig () {
		return MQTTConfig.mqttConfig;
	}
	
	private MQTTConfig() {}
	
	public void addKnownIP (String brokerIP) {
		this.knownIPs.add(brokerIP);
		handleConfigChange();
	}
	
	public void addKnownTopicPath (String topicPath) {
		this.knownTopicPaths.add(topicPath);
		handleConfigChange();
	}
	
	public void removeKnownIP (String brokerIP) {
		this.knownIPs.remove(brokerIP);
		handleConfigChange();
	}
	
	public void removeKnownTopicPath (String topicPath) {
		this.knownTopicPaths.remove(topicPath);
		handleConfigChange();
	}
	
	/**
	 * TODO: Make this write a JSON file which can be used by REST
	 */
	private void handleConfigChange () {
		lastUpdated = LocalDateTime.now().toString();
		ObjectMapper objectMapper = new ObjectMapper();
	}
	
}
