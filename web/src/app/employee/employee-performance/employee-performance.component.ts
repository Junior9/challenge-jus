import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AsingnService } from "./../../service/asingn.service";
import { PerformanceService } from "./../../service/performance.service";
import { EmployeeService} from "./../../service/employee.service";

@Component({
  selector: 'app-employee-performance',
  templateUrl: './employee-performance.component.html',
  styleUrls: ['./employee-performance.component.scss']
})
export class EmployeePerformanceComponent implements OnInit {

  id:any;
  msnError:string="";
  employeeId:any;
  performances:any=[];
  employee:any={
    name:'',
    img:"assets/nouser.png",
    profesion:""
  }
  employeeAssing:any={}

  performance:any={
    id:"",
    text:"",
    created_by:"",
    cdate:new Date()
  }
  constructor(private route: ActivatedRoute,private performanceService:PerformanceService,private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.employeeId = this.route.snapshot.paramMap.get("employeeId");

    this.employeeService.getById(this.id).subscribe(data=>{
      this.employee = data;
      this.performance.id = this.id;
    })

    this.employeeService.getById(this.employeeId).subscribe(data=>{
      this.employeeAssing = data;
      this.performance.created_by = this.employeeAssing.name;
      this.performance.id = this.id;
    })

    this.performanceService.getById(this.id).subscribe(data=>{
      let resp:any = data;
      this.performances = resp;
    })
  }

  add(){
    this.msnError = "";
    if(this.performance.text != ""){
      this.performanceService.add(this.performance).subscribe(data=>{
        this.performances.push(this.performance)
      })
    }else{
      this.msnError = "Campo Obligatorio"
    }
  }
}