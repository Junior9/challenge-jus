import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "./../../service/employee.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private employeeService:EmployeeService) { }
  employees:any=[];

  ngOnInit(): void {

    this.employeeService.get().subscribe(data=>{
      this.employees = data;
    })
  }

}
