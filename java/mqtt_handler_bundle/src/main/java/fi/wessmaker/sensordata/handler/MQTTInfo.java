package fi.wessmaker.sensordata.handler;

import java.util.ArrayList;

public class MQTTInfo {
	private String brokerIp = "http://localhost:1883";
	private boolean connection = false;
	private ArrayList<CustomTopic> customTopics = new ArrayList<>();;
	private boolean autoReconnect = false;
	
	protected MQTTInfo() {}
	
	public void setBrokerIP (String brokerIP) {
		this.brokerIp = brokerIP;
	}
	
	public void setConnection (boolean connection) {
		this.connection = connection;
	}
	
	public void setAutoReconnect (boolean autoReconnect) {
		this.autoReconnect = autoReconnect;
	}
	
	public String getBrokerIP () {
		return this.brokerIp;
	}
	
	public boolean isConnection () {
		return this.connection;
	}
	
	public boolean isAutoReconnect () {
		return autoReconnect;
	}
	
	public ArrayList<CustomTopic> getCustomTopics () {
		return this.customTopics;
	}
}
