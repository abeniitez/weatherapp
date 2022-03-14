import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NewcityComponent } from './views/newcity/newcity.component';

const routes: Routes = [
  { path: '',redirectTo:'login', pathMatch:'full'},
  { path: 'login', component:LoginComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'newcity', component:NewcityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,DashboardComponent, NewcityComponent]
