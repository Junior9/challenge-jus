import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URL = "http://localhost:9091/api/employee/"

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(this.URL+"get");
  }

  getById(id:string){
    return this.http.get(this.URL+"get/"+id);
  }

  async delete(id:string){
    return await fetch(this.URL+"delete/"+id, {
      method: "GET",
    }).then((resp)=>{
      return resp.json()
    })
    .then((json)=>{
      return json
    },
    (error)=>{
        console.log(error)
        return null;
    });
  }


  async add(employee:Employee){
     return await fetch(this.URL+"add", {
        method: "POST",
        body: JSON.stringify(employee)
      }).then((resp)=>{
        return resp.json()
      })
      .then((json)=>{
        return json
      },
      (error)=>{
          return null;
      });
  }

  async update(employee:Employee,id:string){

    let employeeUpdate:any = employee;
    employeeUpdate.id = id;
    employeeUpdate.updated_at = new Date()
    await fetch(this.URL+"update", {
      method: "POST",
      body: JSON.stringify(employeeUpdate)
    }).then((resp)=>{
      return resp.json()
    })
    .then((json)=>{
      return json
    },
    (error)=>{
        console.log(error)
        return null;
    });

  }
}
