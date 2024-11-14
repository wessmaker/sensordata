package fi.wessmaker.sensordata.mqttconfig;

import javax.ws.rs.core.Configuration;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.MessageBodyWriter;
import org.glassfish.jersey.message.internal.MessageBodyFactory;


public class MQTTConfigApi implements MQTTConfigService {
	
	@Override
	public String configGET () {
		
		return MQTTConfig.get().toString();
		// return Response.status(Status.OK).entity(MQTTConfig.get()).build();
	}
	
	@Override
	public String configPOST (MQTTConfig config) {
		return "WORKS";
		
		// MQTTConfig.set(config);
		// return Response.status(Status.OK).entity(MQTTConfig.get()).build();
		
	}
}
