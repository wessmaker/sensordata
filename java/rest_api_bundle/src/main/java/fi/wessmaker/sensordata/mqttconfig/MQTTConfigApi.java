package fi.wessmaker.sensordata.mqttconfig;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

public class MQTTConfigApi implements MQTTConfigService {
	
	@Override
	public Response configGET () {
		return Response.status(Status.OK).entity(MQTTConfig.get()).build();
	}
	
	@Override
	public Response configPOST (MQTTConfig config) {
		MQTTConfig.set(config);
		return Response.status(Status.OK).entity(MQTTConfig.get()).build();
	}
}
