package perfomance.services;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import perfomance.models.Performance;
import perfomance.repositories.PerformanceRepository;
import org.json.JSONObject;

@ApplicationScoped
public class PerformanceService {

	@Inject
	PerformanceRepository repositoryPerformance;

    public JSONObject add(Performance perfomance){
        JSONObject data = new JSONObject(perfomance); 
        this.repositoryPerformance.add(perfomance);
        return data;
    }

    public JSONObject update(Performance perfomance){
        JSONObject data = new JSONObject(); 
        return data;
    }

    public List<JSONObject> get(){
        List<JSONObject> resultList = this.repositoryPerformance.get();
        return resultList;
    }

    public List<JSONObject> getById(String id){
        return this.repositoryPerformance.getById(id);
    }
}