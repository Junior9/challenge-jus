package perfomance.models;

public class Performance {

    private String idEmployee;
    private String text;
    private String created_by;

    public Performance(){}

    public Performance(String id, String text,String created_by){
        this.idEmployee = id;
        this.text = text;
        this.created_by = created_by;
    }

    public String getIdEmployee(){
        return this.idEmployee;
    }

    public String gettext(){
        return this.text;
    }

    public String getCreated(){
        return this.created_by;
    }
    
}
