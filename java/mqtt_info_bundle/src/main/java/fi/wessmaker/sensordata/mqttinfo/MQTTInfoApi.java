package fi.wessmaker.sensordata.mqttinfo;

import java.util.ArrayList;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.*;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.osgi.dto.DTO;

import fi.wessmaker.sensordata.handler.CustomTopic;
import fi.wessmaker.sensordata.handler.MQTTHandler;

public class MQTTInfoApi implements MQTTInfoService {

	MQTTHandler mqttHandeler = MQTTHandler.get();

	@Override
	public Response getAllInfo() {
		return Response.status(Status.OK).entity(MQTTHandler.getAsString()).build();
	}

	@Override
	public Response getTopic(String path) {
		return Response.status(Status.OK).entity(mqttHandeler.getCustomTopic(path)).build();
	}

	@Override
	public Response getAllTopics() {
		return Response.status(Status.OK).entity(mqttHandeler.getCustomTopics()).build();
	}

	@Override
	public Response getTopicCount() {
		return Response.status(Status.OK).entity(mqttHandeler.getCustomTopics().size()).build();
	}

	@Override
	public Response getConnection() {
		return Response.status(Status.OK).entity(mqttHandeler.hasConnection()).build();
	}
}
