import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  private URL = "http://localhost:9092/api/"

  constructor(private http: HttpClient) { }


  add(performance:any){
    return this.http.post(this.URL+"add",performance)
  }

  getById(id:string){
    return this.http.get(this.URL+"getById/"+id);
  }
}
