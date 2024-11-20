package fi.wessmaker.sensordata.mqttinfo;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/info")
public interface MQTTInfoService {
	String topicsPath = "/topic";
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	Response getAllInfo ();
	
	
	
	/**
	 * topic info includes: topicPath, subscriptionDate, defaultValue, isRetained, topicType
	 */
	@GET
	@Path(topicsPath + "/{path}")
	@Produces(MediaType.APPLICATION_JSON)
	Response getTopic (@PathParam("path")
	String path);
	
	@GET
	@Path(topicsPath + "/all")
	@Produces(MediaType.APPLICATION_JSON)
	Response getAllTopics (@PathParam("path")
	String path);
	
	
	@GET
	@Path(topicsPath + "/count")
	@Produces(MediaType.APPLICATION_JSON)
	Response getTopicCount ();
	
	
	
}
