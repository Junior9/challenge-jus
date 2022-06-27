import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { EmployeeComponent } from "./employee/employee.component";
import { EmployeePerformanceComponent } from "./employee-performance/employee-performance.component"

const routes: Routes = [
  {path:"employee", component:HomeComponent},
  {path:"employee/performance/:id",  component:EmployeeComponent},
  {path:"employee/info/performance/:id/:employeeId", component:EmployeePerformanceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
  