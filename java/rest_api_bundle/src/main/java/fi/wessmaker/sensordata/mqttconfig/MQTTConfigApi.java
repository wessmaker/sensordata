package fi.wessmaker.sensordata.mqttconfig;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;


public class MQTTConfigApi implements MQTTConfigService {
	
	@Override
	public Response configGET () {
		MQTTConfig.get().setBrokerIp(String.valueOf(Math.random()));
		return Response.status(Status.OK).entity(MQTTConfig.get()).build();
	}
	
	@Override
	public Response configPOST (MQTTConfig config) {
		MQTTConfig.set(config);
		return Response.status(Status.OK).entity(MQTTConfig.get()).build();
	}
	
}
