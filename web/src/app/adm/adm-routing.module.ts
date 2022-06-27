import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { EmployeeComponent } from "./employee/employee.component";
import { NewEmployeeComponent } from "./new-employee/new-employee.component";

const routes: Routes = [
  {path:"adm",component:HomeComponent},
  {path:"adm/add/employee",component:NewEmployeeComponent},
  {path:"adm/employee/update/:id",component:NewEmployeeComponent},
  {path:"adm/employee/:id",component:EmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
 