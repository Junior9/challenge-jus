import { Component, OnInit } from '@angular/core';
import { AsingnService } from "./../../service/asingn.service";
import { EmployeeService } from "./../../service/employee.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private asingnService:AsingnService,private route: ActivatedRoute,private employeeService:EmployeeService) { }

  id:any;
  employees:any=[];
  employee:any={}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    this.employeeService.getById(this.id).subscribe(dataEmployee=>{
      this.employee = dataEmployee;
    })

    this.asingnService.getById(this.id).subscribe(data=>{
      let resp:any = data;
      this.employees = resp.resp;
    })
  }

}
