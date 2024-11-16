package fi.wessmaker.sensordata.mqtt;

import java.util.ArrayList;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

public class MQTTHandler {
	
	private static MQTTHandler mqttHandeler;
	private String brokerIp;
	private MqttClient mqttClient;
	private boolean connection;
	private ArrayList<CustomTopic> customTopics = new ArrayList<>();
	private boolean autoReconnect;
	
	
	private MQTTHandler() {}
	
	public synchronized MQTTHandler get () {
		if (MQTTHandler.mqttHandeler == null) {
			MQTTHandler.mqttHandeler = new MQTTHandler();
		}
		return MQTTHandler.mqttHandeler;
	}
	
	public String getBrokerIP () {
		return mqttClient != null ? this.brokerIp : "";
	}
	
	public boolean hasConnection () {
		return this.connection;
	}
	
	public ArrayList<CustomTopic> getCustomTopics () {
		return this.customTopics;
	}
	
	public boolean isAutoReconnect () {
		return autoReconnect;
	}
	
	public void setAutoReconnect (boolean autoReconnect) {
		this.autoReconnect = autoReconnect;
	}
	
	public MQTTCallOutcome createClient (String brokerIP) {
		try {
			this.brokerIp = brokerIP;
			this.mqttClient = new MqttClient(brokerIP, MqttClient.generateClientId());
			return MQTTCallOutcome.CREATE_CLIENT_SUCCESS;
		} catch (MqttException e) {
			e.printStackTrace();
			return MQTTCallOutcome.CREATE_CLIENT_FAILED;
		}
	}
	
	public MQTTCallOutcome connect () {
		if (this.mqttClient == null) {
			return MQTTCallOutcome.MQTTCLIENT_DOESNT_EXIST;
		}
		try {
			mqttClient.connect();
		} catch (MqttException e) {
			e.printStackTrace();
			return MQTTCallOutcome.CONNECTION_FAILED;
		}
		this.connection = mqttClient.isConnected();
		return this.hasConnection() ? MQTTCallOutcome.CONNECTION_SUCCESS
				: MQTTCallOutcome.CONNECTION_FAILED;
	}
	
	public MQTTCallOutcome disconnect () {
		if (this.mqttClient == null) {
			return MQTTCallOutcome.MQTTCLIENT_DOESNT_EXIST;
		}
		try {
			mqttClient.disconnect();
		} catch (MqttException e) {
			e.printStackTrace();
			return MQTTCallOutcome.DISCONNECTION_FAILED;
		}
		this.connection = mqttClient.isConnected();
		return !this.hasConnection() ? MQTTCallOutcome.DISCONNECTION_SUCCESS
				: MQTTCallOutcome.DISCONNECTION_FAILED;
	}
	
	
	
	private CustomTopic getCustomTopic (String searchPath) {
		for (CustomTopic loopedTopic : getCustomTopics()) {
			if (loopedTopic.getPath().equals(searchPath)) {
				return loopedTopic;
			}
		}
		return null;
	}
	
	
	
	/**
	 * @return SUBSCRIBE_SUCCESS if topic was able to be subscribed, SUBSCRIBE_FAILED if not.
	 *         ALREADY_SUBSCRIBED if the topicValue is already subscribed.
	 */
	public MQTTCallOutcome subscribeTopic (CustomTopic topic) {
		if (getCustomTopic(topic.getPath()) != null) {
			return MQTTCallOutcome.ALREADY_SUBSCRIBED;
		}
		try { // First test to sub it and then add to the topicList
			this.mqttClient.subscribe(topic.getPath());
		} catch (MqttException e) {
			e.printStackTrace();
			return MQTTCallOutcome.SUBSCRIBE_FAILED;
		}
		this.customTopics.add(topic);
		return MQTTCallOutcome.SUBSCRIBE_SUCCESS;
	}
	
	
	/**
	 * @return UNSUBSCRIBE_SUCCESS if topic was able to be unsubscribed, UNSUBSCRIBE_FAILED if not.
	 *         UNALREADY_SUBSCRIBED if the topicValue is already unsubscribed.
	 */
	public MQTTCallOutcome unsubscribeTopic (CustomTopic topic) {
		
		if (getCustomTopic(topic.getPath()) == null) {
			return MQTTCallOutcome.ALREADY_UNSUBSCRIBED;
		}
		try { // First test to unsub it and then remove to the topicList
			this.mqttClient.unsubscribe(topic.getPath());
		} catch (MqttException e) {
			e.printStackTrace();
			return MQTTCallOutcome.UNSUBSCRIBE_FAILED;
		}
		this.customTopics.remove(topic);
		return MQTTCallOutcome.UNSUBSCRIBE_SUCCESS;
	}
	
}
