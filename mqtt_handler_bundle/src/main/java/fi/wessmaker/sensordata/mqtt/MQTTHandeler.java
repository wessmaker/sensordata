package fi.wessmaker.sensordata.mqtt;

import java.util.ArrayList;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

public class MQTTHandeler {
	private static MQTTHandeler mqttHandeler;
	private String brokerIp;
	private MqttClient mqttClient;
	private boolean connection;
	private ArrayList<CustomTopic> customTopics = new ArrayList<>();
	
	private MQTTHandeler() {}
	
	public MQTTHandeler get () {
		return MQTTHandeler.mqttHandeler == null ? new MQTTHandeler() : MQTTHandeler.mqttHandeler;
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
	
	public MQTTOutcome createClient (String brokerIP) {
		try {
			this.brokerIp = brokerIP;
			this.mqttClient = new MqttClient(brokerIP, MqttClient.generateClientId());
			return MQTTOutcome.CREATE_CLIENT_SUCCESS;
		} catch (MqttException e) {
			e.printStackTrace();
			return MQTTOutcome.CREATE_CLIENT_FAILED;
		}
	}
	
	public MQTTOutcome connectMQTT () {
		if (this.mqttClient == null) {
			return MQTTOutcome.MQTTCLIENT_DOESNT_EXIST;
		}
		try {
			mqttClient.connect();
		} catch (MqttException me) {
			me.printStackTrace();
		}
		this.connection = mqttClient.isConnected();
		return this.hasConnection() ? MQTTOutcome.CONNECTION_SUCCESS
				: MQTTOutcome.CONNECTION_FAILED;
	}
	
	private CustomTopic getCustomTopic (String searchTopicPath) {
		for (CustomTopic loopedTopic : getCustomTopics()) {
			if (loopedTopic.getPath().equals(searchTopicPath)) {
				return loopedTopic;
			}
		}
		return null;
	}
	
	/**
	 * @return SUBSCRIBE_SUCCESS if topic was able to be subscribed, SUBSCRIBE_FAILED if not.
	 *         ALREADY_SUBSCRIBED if the topicValue is already subscribed.
	 */
	public MQTTOutcome subscribeTopicValue (CustomTopic topic) {
		if (getCustomTopic(topic.getPath()) != null) {
			return MQTTOutcome.ALREADY_SUBSCRIBED;
		}
		try { // First test to sub it and then add to the topicList
			this.mqttClient.subscribe(topic.getPath());
		} catch (MqttException e) {
			e.printStackTrace();
			return MQTTOutcome.SUBSCRIBE_FAILED;
		}
		this.customTopics.add(topic);
		return MQTTOutcome.SUBSCRIBE_SUCCESS;
	}
	
	/**
	 * @return UNSUBSCRIBE_SUCCESS if topic was able to be unsubscribed, UNSUBSCRIBE_FAILED if not.
	 *         UNALREADY_SUBSCRIBED if the topicValue is already unsubscribed.
	 */
	public MQTTOutcome unsubscribeTopicValue (CustomTopic topicValue) {
		if (getCustomTopic(topicValue.getPath()) != null) {
			return MQTTOutcome.ALREADY_UNSUBSCRIBED;
		}
		try { // First test to unsub it and then remove to the topicList
			this.mqttClient.unsubscribe(topicValue.getPath());
		} catch (MqttException e) {
			e.printStackTrace();
			return MQTTOutcome.UNSUBSCRIBE_FAILED;
		}
		this.customTopics.remove(topicValue);
		return MQTTOutcome.UNSUBSCRIBE_SUCCESS;
	}
}
