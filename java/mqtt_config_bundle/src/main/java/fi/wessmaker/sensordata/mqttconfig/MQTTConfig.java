package fi.wessmaker.sensordata.mqttconfig;


public class MQTTConfig {
	private static String brokerIp = "";
	private static boolean autoReconnect = false;
	private static boolean nonProcessedData = false;
	private static MQTTConfig mqttConfig = new MQTTConfig();
	
	
	private MQTTConfig() {}
	
	
	public static MQTTConfig set (MQTTConfig mqttConfig) {
		MQTTConfig.mqttConfig = mqttConfig;
		return MQTTConfig.get();
	}
	
	
	/**
	 * This method should always be used to get the instance so that future modifications can be
	 * easily implemented here
	 */
	public static MQTTConfig get () {
		return MQTTConfig.mqttConfig;
	}
	
	
	
	public String getBrokerIp () {
		return MQTTConfig.brokerIp;
	}
	
	public boolean isAutoReconnect () {
		return MQTTConfig.autoReconnect;
	}
	
	public boolean isNonProcessedData () {
		return MQTTConfig.nonProcessedData;
	}
	
	
	
	public void setAutoReconnect (boolean autoReconnect) {
		MQTTConfig.autoReconnect = autoReconnect;
	}
	
	public void setBrokerIp (String brokerIp) {
		MQTTConfig.brokerIp = brokerIp;
	}
	
	public void setNonProcessedData (boolean nonProcessedData) {
		MQTTConfig.nonProcessedData = nonProcessedData;
	}
	
}
