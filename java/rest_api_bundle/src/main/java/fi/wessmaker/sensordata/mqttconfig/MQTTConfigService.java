package fi.wessmaker.sensordata.mqttconfig;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;


@Path("/mqtt/config")
public interface MQTTConfigService {
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	Response configPOST (MQTTConfig config);
	
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	Response configGET ();
	
}
