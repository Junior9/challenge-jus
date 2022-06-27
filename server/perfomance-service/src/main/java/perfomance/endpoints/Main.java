package perfomance.endpoints;


import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

import perfomance.models.Performance;
import org.json.JSONObject;
import perfomance.services.PerformanceService;

import javax.ws.rs.Produces;

@Path("/api")
public class Main {

    	
	@Inject
	PerformanceService servicePerformance;
    
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("get")
    public List<JSONObject> get() {
        List<JSONObject> result = this.servicePerformance.get();
        return result;
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("getById/{id}")
    public List<JSONObject> getById(String id) {
        List<JSONObject> result = this.servicePerformance.getById(id);
        return result;
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Path("add")
    public JSONObject add(String payload) {
        JSONObject data = new JSONObject(payload);
        Performance performance = new Performance(data.getString("id"),data.getString("text"),data.getString("created_by"));
        JSONObject result = this.servicePerformance.add(performance);
        return result;
    }

}
