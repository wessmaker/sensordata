package fi.wessmaker.sensordata.handler;

/**
 * Used to simplify methods, method can return MQTTOutcome but it's not neccessary to be used in
 * callers end. Gives more information than traditional boolean return value
 */
public enum MQTTCallOutcome {
	CONNECTION_SUCCESS, CONNECTION_FAILED, CONNECTION_ALREADY_EXISTS, DISCONNECTION_SUCCESS, DISCONNECTION_FAILED, MQTTCLIENT_DOESNT_EXIST, ALREADY_SUBSCRIBED, ALREADY_UNSUBSCRIBED, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAILED, UNSUBSCRIBE_SUCCESS, UNSUBSCRIBE_FAILED, CREATE_CLIENT_SUCCESS, CREATE_CLIENT_FAILED
}
