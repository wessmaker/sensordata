package fi.wessmaker.sensordata.mqtt;

/**
 * Used to simplify methods, method can return MQTTOutcome but it's not neccessary to be used in
 * callers end. Gives more information than traditional boolean return value
 */
public enum MQTTOutcome {
	CONNECTION_SUCCESS, CONNECTION_FAILED, CONNECTION_ALREADY_EXISTS, MQTTCLIENT_DOESNT_EXIST, ALREADY_SUBSCRIBED, ALREADY_UNSUBSCRIBED, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAILED, UNSUBSCRIBE_SUCCESS, UNSUBSCRIBE_FAILED, CREATE_CLIENT_SUCCESS, CREATE_CLIENT_FAILED
}
