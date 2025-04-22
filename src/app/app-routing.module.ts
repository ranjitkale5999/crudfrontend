import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddstudComponent } from './Student/addstud/addstud.component';
import { StudComponent } from './Student/stud/stud.component';
import { UpdatestudComponent } from './Student/updatestud/updatestud.component';
import { ReactiveformComponent } from './ReactiveForms/reactiveform/reactiveform.component';
import { StudaddComponent } from './ReactiveForms/studadd/studadd.component';
import { StudreactiveComponent } from './ReactiveForms/studreactive/studreactive.component';
import { StudupdateComponent } from './ReactiveForms/studupdate/studupdate.component';
import { StudentUpdateComponent } from './ReactiveForms/student-update/student-update.component';

const routes: Routes = [
  {path:'addstud',component:AddstudComponent},
  {path:'studUpdate/:id',component:StudentUpdateComponent},
  // {path:'studUpdate/:id',component:StudupdateComponent},
  {path:'studrective',component:StudreactiveComponent},
  {path:'reactiveform',component:ReactiveformComponent},
  // {path:'stud',component:StudComponent},
  {path:'stud',component:StudComponent},
  {path:'studadd',component:StudaddComponent},
  {path:'',redirectTo:'reactiveform',pathMatch:'full'},
  // {path:'',redirectTo:'stud',pathMatch:'full'},

  {path:'updatestud/:id',component:UpdatestudComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
