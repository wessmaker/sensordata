package fi.wessmaker.sensordata.mqttinfo;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.*;

import fi.wessmaker.sensordata.handler.MQTTHandler;

public class MQTTInfoApi implements MQTTInfoService {

	@Override
	public Response getAllInfo() {

		return Response.status(Status.OK).entity(MQTTHandler.get().getMQTTInfo()).build();
	}

	@Override
	public Response getTopic(String path) {
		return Response.status(Status.OK).entity(MQTTHandler.get().getCustomTopic(path)).build();
	}

	@Override
	public Response getAllTopics() {
		return Response.status(Status.OK).entity(MQTTHandler.get().getMQTTInfo().getCustomTopics()).build();
	}

	@Override
	public Response getTopicCount() {
		return Response.status(Status.OK).entity(MQTTHandler.get().getMQTTInfo().getCustomTopics().size()).build();
	}

	@Override
	public Response getConnection() {
		return Response.status(Status.OK).entity(MQTTHandler.get().getMQTTInfo().isConnection()).build();
	}
}
