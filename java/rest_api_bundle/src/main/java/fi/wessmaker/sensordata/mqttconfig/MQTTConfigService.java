package fi.wessmaker.sensordata.mqttconfig;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/mqtt/config")
public interface MQTTConfigService {
	
	@GET
	// @Produces(MediaType.APPLICATION_JSON)
	String configGET ();
	
	@POST
	// @Consumes(MediaType.TEXT_PLAIN)
	String configPOST (MQTTConfig config);
}
