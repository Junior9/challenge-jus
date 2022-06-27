import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "./../../service/employee.service";
import { PerformanceService } from "./../../service/performance.service";
import { AsingnService } from "./../../service/asingn.service";
import { Employee } from "./../../model/employee";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService:EmployeeService,private route: ActivatedRoute,private performanceService:PerformanceService,private asingnService:AsingnService) { }
  id:any;
  employee:any={}
  employees:any=[]
  msnErrorPerformance:string=""
  msnErrorEmployee:string=""
  msnErrorAssing:string=""
  assignEmployees:any=[]
  selectEmployee:any=""
  performances:any=[];
  msnError:string="";
  performance:any={
    id:"",
    text:"",
    created_by:"ADM",
    cdate:new Date()
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get("id");
    this.performance.id = this.id;

    this.employeeService.getById(this.id).subscribe(data=>{
      this.employee = data;
    },error=>{
      this.msnErrorEmployee = "Service Employee Dowm";
    })   
    
    this.performanceService.getById(this.id).subscribe(data=>{
      this.performances = data;
    },error=>{
      this.msnErrorPerformance = "Service Performance Dowm";
    })

    this.employeeService.get().subscribe(data=>{
      let list:any = data;
      for(let i=0; i<list.length;i++){
        if(this.id != list[i].id){
          this.employees.push(list[i])
        }
      }
    })
    this.asingnService.getByIdAssign(this.id).subscribe(data=>{
      let dataResp:any = data;
      this.assignEmployees = dataResp.resp;
    },error=>{
      this.msnErrorAssing = "Service Assignments Dowm";
    })
  }

  addPerformance(){
    this.msnError = "";
    if(this.performance.text != ""){
      this.performanceService.add(this.performance).subscribe(data=>{
        this.performances.push(this.performance)
        this.cancel()
      },error=>{
        this.msnErrorPerformance = "Service Performance Dowm";
      })
    }else{
      this.msnError = "Campo obligatorio"
    }
  }

  addAssingn(){
    this.msnError = "";
    if(this.selectEmployee != ""){
      this.employeeService.getById(this.selectEmployee).subscribe(data=>{
        let dataEmployeeSelected:any = data;
        let assign = {
          idEmployee:this.id,
          name:dataEmployeeSelected.name,
          profesion:dataEmployeeSelected.profesion,
          assignName:this.employee.name,
          assignProfesion:this.employee.profesion
        }
        let payload ={
          idEmployee:dataEmployeeSelected.id,
          idEmployeeAssign:this.id,

          name:dataEmployeeSelected.name,
          profesion:dataEmployeeSelected.profesion,
          assignName:this.employee.name,
          assignProfesion:this.employee.profesion
        }
        this.asingnService.add(payload).subscribe(data=>{
          this.assignEmployees.push(assign)
          this.cancel()
        },error=>{
          this.msnErrorAssing = "Service Assignments Dowm";
        })
      })
    }else{
      this.msnError = "Campo obligatorio"
    }
  }

  showAssignFormMobile(){
    var formAssign = document.getElementById('mobile-assignment')  as HTMLElement;
    formAssign.style.display = "block";

    var form = document.getElementById('mobile-employee')  as HTMLElement;
    form.style.display = "none"
  }

  showPerformanceFormMobile(){
    var form = document.getElementById('mobile-employee')  as HTMLElement;
    form.style.display = "block"

    var formAssign = document.getElementById('mobile-assignment')  as HTMLElement;
    formAssign.style.display = "none";
  }


  showAssignForm(){
    var formAssign = document.getElementById('form-assign')  as HTMLElement;
    var form = document.getElementById('form')  as HTMLElement;
    var info = document.getElementById('info')  as HTMLElement;

    info.style.width = "65%"
    formAssign.style.width = "35%";
    formAssign.style.display = "block";
    form.style.display = "none";
  }

  showPerformanceForm(){
    var form = document.getElementById('form')  as HTMLElement;
    var formAssign = document.getElementById('form-assign')  as HTMLElement;
    var info = document.getElementById('info')  as HTMLElement;

    info.style.width = "65%"
    form.style.width = "35%";
    form.style.display = "block"
    formAssign.style.display = "none";
  }

  cancel(){
    var form = document.getElementById('form')  as HTMLElement;;
    var form_assign = document.getElementById('form-assign')  as HTMLElement;;
    var info = document.getElementById('info')  as HTMLElement;;

    info.style.width = "100%";
    form.style.display = "none";
    form_assign.style.display = "none";
  }

  cancelMobile(){
    var formAssign = document.getElementById('mobile-assignment')  as HTMLElement;
    var form = document.getElementById('mobile-employee')  as HTMLElement;

    form.style.display = "none";
    formAssign.style.display = "none";
  }

}
