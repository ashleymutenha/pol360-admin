import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent}  from './pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AddProjectComponent} from './pages/add-project/add-project.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path:'dashboard', component:DashboardComponent},
  // {path:'add-project',component:AddProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
