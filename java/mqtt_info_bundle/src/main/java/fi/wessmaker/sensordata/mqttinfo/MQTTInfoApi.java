package fi.wessmaker.sensordata.mqttinfo;

import javax.ws.rs.core.Response.*;


public class MQTTInfoApi {
	
	@Override
	public Response getAllInfo () {
		return Response.status(Status.OK).entity(MQTTHandler.get()).build();
	}
	
	@Override
	public Response getTopic (String path) {
		return Response.status(Status.OK).entity(MQTTHandler.get).build();
	}
	
	@Override
	public Response getAllTopics (String path) {}
	
	@Override
	public Response getTopicCount () {}
	
}
