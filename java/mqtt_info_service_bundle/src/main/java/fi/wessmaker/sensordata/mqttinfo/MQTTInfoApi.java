package fi.wessmaker.sensordata.mqttinfo;


import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import fi.wessmaker.sensordata.handler.MQTTHandler;

public class MQTTInfoApi implements MQTTInfoService {
	
	
	@Override
	public Response getAllInfo () {
		return Response.status(Status.OK).entity(MQTTHandler.get()).build();
	}
	
	@Override
	public Response getTopic (String path) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'getTopic'");
	}
	
	@Override
	public Response getAllTopics (String path) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'getAllTopics'");
	}
	
	@Override
	public Response getTopicCount () {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'getTopicCount'");
	}
	
}
