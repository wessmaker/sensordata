package fi.wessmaker.sensordata.handler;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

public class MQTTHandler {
	
	private MQTTInfo mqttInfo = new MQTTInfo();
	private MqttClient mqttClient = null;
	private static MQTTHandler mqttHandler = new MQTTHandler();
	
	public static MQTTHandler get () {
		return MQTTHandler.mqttHandler;
	}
	
	public MQTTInfo getMQTTInfo () {
		return this.mqttInfo;
	}
	
	public MQTTCallOutcome createClient (String brokerIP) {
		MQTTCallOutcome outcome;
		try {
			mqttClient = new MqttClient(brokerIP, MqttClient.generateClientId());
			outcome = MQTTCallOutcome.CREATE_CLIENT_SUCCESS;
		} catch (MqttException e) {
			e.printStackTrace();
			outcome = MQTTCallOutcome.CREATE_CLIENT_FAILED;
		}
		if (MQTTCallOutcome.CREATE_CLIENT_SUCCESS.equals(outcome)) {
			mqttInfo.setBrokerIP(brokerIP);
		}
		return outcome;
	}
	
	public MQTTCallOutcome connect () {
		MQTTCallOutcome outcome;
		try {
			mqttClient.connect();
			outcome = MQTTCallOutcome.CONNECTION_SUCCESS;
		} catch (MqttException me) {
			me.printStackTrace();
			outcome = MQTTCallOutcome.CONNECTION_FAILED;
		} catch (NullPointerException ne) {
			ne.printStackTrace();
			outcome = MQTTCallOutcome.MQTTCLIENT_DOESNT_EXIST;
		}
		if (MQTTCallOutcome.CONNECTION_SUCCESS.equals(outcome)) {
			mqttInfo.setConnection(true);
		}
		return outcome;
	}
	
	public MQTTCallOutcome disconnect () {
		MQTTCallOutcome outcome;
		try {
			mqttClient.disconnect();
			outcome = MQTTCallOutcome.DISCONNECTION_SUCCESS;
		} catch (MqttException me) {
			me.printStackTrace();
			outcome = MQTTCallOutcome.DISCONNECTION_FAILED;
		} catch (NullPointerException ne) {
			ne.printStackTrace();
			outcome = MQTTCallOutcome.MQTTCLIENT_DOESNT_EXIST;
		}
		if (MQTTCallOutcome.DISCONNECTION_SUCCESS.equals(outcome)) {
			mqttInfo.setConnection(false);
		}
		return outcome;
	}
	
	public CustomTopic getCustomTopic (String searchPath) {
		for (CustomTopic loopedTopic : mqttInfo.getCustomTopics()) {
			if (searchPath.toLowerCase().equals(loopedTopic.getPath())) {
				return loopedTopic;
			}
		}
		return null;
	}
	
	
	public MQTTCallOutcome subscribeTopic (CustomTopic topic) {
		if (getCustomTopic(topic.getPath()) != null) {
			return MQTTCallOutcome.ALREADY_SUBSCRIBED;
		}
		MQTTCallOutcome outcome;
		try {
			mqttClient.subscribe(topic.getPath());
			mqttInfo.getCustomTopics().add(topic);
			outcome = MQTTCallOutcome.SUBSCRIBE_SUCCESS;
		} catch (MqttException e) {
			e.printStackTrace();
			outcome = MQTTCallOutcome.SUBSCRIBE_FAILED;
		}
		return outcome;
	}
	
	public MQTTCallOutcome unSubscribeTopic (CustomTopic topic) {
		if (getCustomTopic(topic.getPath()) != null) {
			return MQTTCallOutcome.ALREADY_UNSUBSCRIBED;
		}
		MQTTCallOutcome outcome;
		try {
			mqttClient.unsubscribe(topic.getPath());
			mqttInfo.getCustomTopics().remove(topic);
			outcome = MQTTCallOutcome.UNSUBSCRIBE_SUCCESS;
		} catch (MqttException e) {
			e.printStackTrace();
			outcome = MQTTCallOutcome.UNSUBSCRIBE_FAILED;
		}
		return outcome;
	}
	
}
