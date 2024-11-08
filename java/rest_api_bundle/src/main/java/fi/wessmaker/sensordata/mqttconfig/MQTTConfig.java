package fi.wessmaker.sensordata.mqttconfig;


public class MQTTConfig {
	private static String brokerIp;
	private static boolean autoReconnect;
	private static boolean nonProcessedData;
	private static MQTTConfig mqttConfig;
	
	
	private MQTTConfig() {}
	
	
	public static MQTTConfig create (String brokerIp, boolean autoReconnect,
			boolean nonProcessedData) {
		MQTTConfig.mqttConfig = new MQTTConfig();
		MQTTConfig.brokerIp = brokerIp;
		MQTTConfig.autoReconnect = autoReconnect;
		MQTTConfig.nonProcessedData = nonProcessedData;
		return MQTTConfig.get();
	}
	
	
	public static MQTTConfig set (MQTTConfig mqttConfig) {
		MQTTConfig.mqttConfig = mqttConfig;
		return MQTTConfig.get();
	}
	
	
	/**
	 * This method should always be used to get the instance so that furute modifications can be
	 * easily implemented here
	 */
	public static MQTTConfig get () {
		if (mqttConfig == null) {
			MQTTConfig.mqttConfig = MQTTConfig.create(null, false, false);
		}
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
