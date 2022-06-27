package perfomance.repositories;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.bson.Document;
import org.json.JSONObject;

import static com.mongodb.client.model.Filters.eq;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;

import perfomance.models.Performance;

@ApplicationScoped
public class PerformanceRepository {

    @Inject MongoClient mongoClient;


    public void add(Performance perfomance){
        Document document = new Document()
                .append("idEmployee", perfomance.getIdEmployee())
                .append("text", perfomance.gettext())
                .append("created_by", perfomance.getCreated());
        getCollection().insertOne(document);
    }

    
    public List<JSONObject> get(){
        List<JSONObject> list = new ArrayList<>();
        MongoCursor<Document> cursor = getCollection().find().iterator();

        try {
            while (cursor.hasNext()) {
                Document document = cursor.next();
                JSONObject performance = new JSONObject(document);
                //performance.
                //Performance performance = new Performance(document.getString("id"),document.getString("text"),document.getString("created_by"));
                list.add(performance);
            }
        } finally {
            cursor.close();
        }
        return list;
    }

    public List<JSONObject> getById(String id){
        List<JSONObject> list = new ArrayList<>();
        MongoCursor<Document> cursor = getCollection().find(eq("idEmployee", id)).iterator(); 

        try {
            while (cursor.hasNext()) {
                Document document = cursor.next();
                JSONObject performance = new JSONObject(document);
                //performance.
                //Performance performance = new Performance(document.getString("id"),document.getString("text"),document.getString("created_by"));
                list.add(performance);
            }
        } finally {
            cursor.close();
        }
        return list;
    }


    private MongoCollection getCollection(){
        return mongoClient.getDatabase("justo-db").getCollection("performance");
    }
    
}
