import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../Class/teacher';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient:HttpClient) { }
    private baseUrl:string="http://localhost:8084/api/v3/teacher";

    //  getTeacherList ():Observable<Teacher[]>{
    //     return this.httpClient.get<Teacher[]>(this.baseUrl)
    //    }




    getTeacherList ():Observable<ApiResponse<Teacher[]>>{
          return this.httpClient.get<ApiResponse<Teacher[]>>(this.baseUrl)
         }
  
}
