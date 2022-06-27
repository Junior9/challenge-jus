import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "./../../service/employee.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private employeeService:EmployeeService) { }

  employees:any = []
  msnError:string="";
  ngOnInit(): void {
    this.employeeService.get().subscribe(data=>{
      this.employees = data;
    },error=>{
      this.msnError = "Service Employee Dowm";
    })
  }

  delete(id:string){
    this.employeeService.delete(id)
    let index = 0;
    for (index; index < this.employees.length; index++){
      if (this.employees[index].id == id){
        this.employees.splice(index, 1);
        break;
      }
    }
  }
}
