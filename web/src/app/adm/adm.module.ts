import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { HomeComponent } from './home/home.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    NewEmployeeComponent,
    EmployeeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdmModule { }
