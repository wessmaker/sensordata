package fi.wessmaker.sensordata.mqttinformation;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

@Path("/mqtt/info")
public interface MQTTInfoService {
	
	@javax.ws.rs.GET
	@javax.ws.rs.Path("/all")
	@javax.ws.rs.Produces(javax.ws.rs.core.MediaType.APPLICATION_JSON)
	ResponseBuilder allInfoGET ();
	
	@GET
	@Path("/startdatetime")
	@Produces(MediaType.APPLICATION_JSON)
	Response startDateTimeGET ();
	
	
	@GET
	@Path("/topicCount")
	@Produces(MediaType.APPLICATION_JSON)
	Response topicCount ();
}
