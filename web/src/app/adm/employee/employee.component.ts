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

    })   
    
    this.performanceService.getById(this.id).subscribe(data=>{
      this.performances = data;
    },error=>{

    })

    this.employeeService.get().subscribe(data=>{
      let list:any = data;
      for(let i=0; i<list.length;i++){
        if(this.id != list[i].id){
          this.employees.push(list[i])
        }
      }
    })

    console.log(this.id)
    this.asingnService.getByIdAssign(this.id).subscribe(data=>{
      let dataResp:any = data;
      this.assignEmployees = dataResp.resp;

      console.log(dataResp)
    })

  }

  addPerformance(){
    this.msnError = "";
    if(this.performance.text != ""){
      console.log("OK")
      this.performanceService.add(this.performance).subscribe(data=>{
       
        this.performances.push(this.performance)
        this.cancel()
      },error=>{
        console.log("Error")
      })
    }else{
      this.msnError = "Campo obligatorio"
    }
  }


  addAssingn2(){
    this.msnError = "";
    
    if(this.selectEmployee != ""){

      this.employeeService.getById(this.selectEmployee).subscribe(data=>{
        let dataEmployeeSelected:any = data;
        this.asingnService.getById(this.selectEmployee).subscribe(dataAssign=>{
          let dataListEmployeeAssing:any = dataAssign
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
            //this.performances.push(this.performance)
            console.log("Cancela Add")
            this.assignEmployees.push(assign)
            this.cancel()
          },error=>{
            
          })

        })
      })
    }else{
      this.msnError = "Campo obligatorio"
    }

  }
  
  addAssign(){

    this.msnError = "";

    if(this.selectEmployee != ""){
      
      this.asingnService.getById(this.id).subscribe(data=>{
        let resp:any = data; 

        this.employeeService.getById(this.selectEmployee).subscribe(data=>{

          let employeeData:any = data;
          console.log(employeeData)

          let assign = {
            idEmployee:this.id,
            name:employeeData.name,
            profesion:employeeData.profesion,
            assignName:this.employee.name,
            assignProfesion:this.employee.profesion
          }

          let payload ={
            idEmployee:employeeData.id,
            idEmployeeAssign:this.id,
            list:[assign]
          }

          if(resp.status != false ){

            let assign = {
              idEmployee:this.id,
              name:employeeData.name,
              profesion:employeeData.profesion
            }

            console.log(resp.resp)
        
            resp.resp.list.push(assign)
    
            
            
          
            this.asingnService.update(resp.resp).subscribe(data=>{
              //this.performances.push(this.performance)
    
              console.log(data)
              console.log("Cancela Update")

              this.assignEmployees.push(assign)

              this.cancel()
            },error=>{
              
            })
    
          }else{
            
            console.log(payload)
            
            
            this.asingnService.add(payload).subscribe(data=>{
              //this.performances.push(this.performance)
              console.log("Cancela Add")
              this.assignEmployees.push(assign)
              this.cancel()
            },error=>{
              
            })
          }
        })

      },error=>{
        console.log(error)
      })
    }else{
      this.msnError = "Campo obligatorio"
    }


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
    console.log("Cancel")
    var form = document.getElementById('form')  as HTMLElement;;
    var form_assign = document.getElementById('form-assign')  as HTMLElement;;
    var info = document.getElementById('info')  as HTMLElement;;

    info.style.width = "100%";
    form.style.display = "none";
    form_assign.style.display = "none";
  }

}
