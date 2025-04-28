import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudComponent } from './Student/stud/stud.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UpdatestudComponent } from './Student/updatestud/updatestud.component';
import { AddstudComponent } from './Student/addstud/addstud.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveformComponent } from './ReactiveForms/reactiveform/reactiveform.component';
import { CommonModule } from '@angular/common';
import { StudaddComponent } from './ReactiveForms/studadd/studadd.component';
import { StudupdateComponent } from './ReactiveForms/studupdate/studupdate.component';
import { StudreactiveComponent } from './ReactiveForms/studreactive/studreactive.component';
import { StudentUpdateComponent } from './ReactiveForms/student-update/student-update.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({ declarations: [
        AppComponent,
        StudComponent,
        AddstudComponent,
        UpdatestudComponent,
        ReactiveformComponent,
        StudaddComponent,
        StudupdateComponent,
        StudreactiveComponent,
        StudentUpdateComponent
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA],
     imports: [BrowserModule,
        AppRoutingModule,
        NgSelectModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        CommonModule,
        MatButtonModule,
        
],
        providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
