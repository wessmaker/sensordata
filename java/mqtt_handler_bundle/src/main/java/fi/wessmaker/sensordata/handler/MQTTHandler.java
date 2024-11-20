package fi.wessmaker.sensordata.handler;

import java.util.ArrayList;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

public class MQTTHandler {

	private static String brokerIp = "";
	private static MqttClient mqttClient = null;
	private static boolean connection = true;
	private static ArrayList<CustomTopic> customTopics = new ArrayList<>();
	private static boolean autoReconnect = true;
	private static MQTTHandler mqttHandeler = new MQTTHandler();

	private MQTTHandler() {
	}

	public static String getAsString() {
		return "brokerip=" + MQTTHandler.brokerIp + ", " + "mqttclient=" + MQTTHandler.autoReconnect + ", "
				+ "connection=" + MQTTHandler.connection + ", " +
				"customtopics=" + MQTTHandler.customTopics + ", " + "mqttclient=" + MQTTHandler.mqttClient + ", "
				+ "mqtthandeler=" + MQTTHandler.mqttHandeler;
	}

	public static MQTTHandler get() {
		System.out.println(MQTTHandler.mqttHandeler);
		return MQTTHandler.mqttHandeler;
	}

	public String getBrokerIP() {
		return mqttClient != null ? MQTTHandler.brokerIp : "";
	}

	public MqttClient getClient() {
		return MQTTHandler.mqttClient;
	}

	public static boolean hasConnection() {
		return MQTTHandler.connection;
	}

	public ArrayList<CustomTopic> getCustomTopics() {
		return MQTTHandler.customTopics;
	}

	public boolean isAutoReconnect() {
		return autoReconnect;
	}

	public void setAutoReconnect(boolean autoReconnect) {
		MQTTHandler.autoReconnect = autoReconnect;
	}

	public MQTTCallOutcome createClient(String brokerIP) {
		try {
			MQTTHandler.brokerIp = brokerIP;
			MQTTHandler.mqttClient = new MqttClient(brokerIP, MqttClient.generateClientId());
			return MQTTCallOutcome.CREATE_CLIENT_SUCCESS;
		} catch (MqttException e) {
			e.printStackTrace();
			return MQTTCallOutcome.CREATE_CLIENT_FAILED;
		}
	}

	public MQTTCallOutcome connect() {
		if (MQTTHandler.mqttClient == null) {
			return MQTTCallOutcome.MQTTCLIENT_DOESNT_EXIST;
		}
		try {
			mqttClient.connect();
		} catch (MqttException e) {
			e.printStackTrace();
			return MQTTCallOutcome.CONNECTION_FAILED;
		}
		MQTTHandler.connection = mqttClient.isConnected();
		return MQTTHandler.hasConnection() ? MQTTCallOutcome.CONNECTION_SUCCESS
				: MQTTCallOutcome.CONNECTION_FAILED;
	}

	public MQTTCallOutcome disconnect() {
		if (MQTTHandler.mqttClient == null) {
			return MQTTCallOutcome.MQTTCLIENT_DOESNT_EXIST;
		}
		try {
			mqttClient.disconnect();
		} catch (MqttException e) {
			e.printStackTrace();
			return MQTTCallOutcome.DISCONNECTION_FAILED;
		}
		MQTTHandler.connection = mqttClient.isConnected();
		return !MQTTHandler.hasConnection() ? MQTTCallOutcome.DISCONNECTION_SUCCESS
				: MQTTCallOutcome.DISCONNECTION_FAILED;
	}

	public CustomTopic getCustomTopic(String searchPath) {
		for (CustomTopic loopedTopic : getCustomTopics()) {
			if (searchPath.toLowerCase().equals(loopedTopic.getPath())) {
				return loopedTopic;
			}
		}
		return null;
	}

	/**
	 * @return SUBSCRIBE_SUCCESS if topic was able to be subscribed,
	 *         SUBSCRIBE_FAILED if not.
	 *         ALREADY_SUBSCRIBED if the topicValue is already subscribed.
	 */
	public MQTTCallOutcome subscribeTopic(CustomTopic topic) {
		if (getCustomTopic(topic.getPath()) != null) {
			return MQTTCallOutcome.ALREADY_SUBSCRIBED;
		}
		try { // First test to sub it and then add to the topicList
			MQTTHandler.mqttClient.subscribe(topic.getPath());
		} catch (MqttException e) {
			e.printStackTrace();
			return MQTTCallOutcome.SUBSCRIBE_FAILED;
		}
		MQTTHandler.customTopics.add(topic);
		return MQTTCallOutcome.SUBSCRIBE_SUCCESS;
	}

	/**
	 * @return UNSUBSCRIBE_SUCCESS if topic was able to be unsubscribed,
	 *         UNSUBSCRIBE_FAILED if not.
	 *         UNALREADY_SUBSCRIBED if the topicValue is already unsubscribed.
	 */
	public MQTTCallOutcome unsubscribeTopic(CustomTopic topic) {
		if (getCustomTopic(topic.getPath()) == null) {
			return MQTTCallOutcome.ALREADY_UNSUBSCRIBED;
		}
		try { // First test to unsub it and then remove to the topicList
			MQTTHandler.mqttClient.unsubscribe(topic.getPath());
		} catch (MqttException e) {
			e.printStackTrace();
			return MQTTCallOutcome.UNSUBSCRIBE_FAILED;
		}
		MQTTHandler.customTopics.remove(topic);
		return MQTTCallOutcome.UNSUBSCRIBE_SUCCESS;
	}

}
