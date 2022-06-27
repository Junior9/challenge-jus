import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "./../../service/employee.service"
import { Employee } from "./../../model/employee";
import {Router} from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

  constructor(private employeeService:EmployeeService,private router: Router,private route: ActivatedRoute) { }

  msnError:string="";
  btnMsn:string = "Register";
  employeeId:any=null;
  employee:any={
    name:"",
    img:"assets/nouser.png",
    profesion:"",
    created_at:new Date(),
    updated_at:new Date()
  }
  isImageSaved: boolean = false;


  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get("id");  
    if(this.employeeId !== null){
      this.btnMsn = "Update"
      this.employeeService.getById(this.employeeId).subscribe(data=>{
        this.employee = data;
        console.log(this.employee)
      },error=>{

      })
    }
  }

  validate(){
    this.msnError = "";
    if(this.employee.name === "" || this.employee.profesion === ""){
      this.msnError = "Campos obligatorios";
      return false;
    }else{
      return true;
    }
  }

  async add(){
    if(this.validate()){
      if(this.employeeId == null){
        let result = await this.employeeService.add(this.employee)
        if(result != null){
          this.router.navigate(['/adm'])
        }else{
          this.msnError = "Service Employee Dowm";
        }
      }else{
        let result  = this.employeeService.update(this.employee,this.employeeId)
        if(result != null){
          this.router.navigate(['/adm'])
        }
      }
    }
  }

  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.employee.img = imgBase64Path;         
          this.isImageSaved = true;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
