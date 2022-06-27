import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsingnService {

  private URL = "http://localhost:9093/api/"

  constructor(private http: HttpClient) { }

  add(assignments:any){
    return this.http.post(this.URL+"assignments/add",assignments)
  }

  update(assignments:any){
    return this.http.put(this.URL+"assignments/update",assignments)
  }

  getById(id:string){
    return this.http.get(this.URL+"assignments/getById/"+id);
  }

  getByIdAssign(id:string){
    return this.http.get(this.URL+"assignments/getByIdAssign/"+id);
  }
}
