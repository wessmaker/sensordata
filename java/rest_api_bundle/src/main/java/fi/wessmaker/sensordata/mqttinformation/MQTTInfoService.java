package fi.wessmaker.sensordata.mqttinformation;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;


@Path("/mqtt/info")
public interface MQTTInfoService {
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	Response allInfoGET ();
	
	@GET
	@Path("/startdatetime")
	@Produces(MediaType.APPLICATION_JSON)
	Response startDateTimeGET ();
	
	
	@GET
	@Path("/topicCount")
	@Produces(MediaType.APPLICATION_JSON)
	Response topicCount ();
}
