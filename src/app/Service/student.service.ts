import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Class/student';
import { ApiResponse } from '../Interfaces/api-response';
import { PaginatedResponse } from '../Interfaces/paginated-response';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  

  constructor(private httpClient:HttpClient) {}
  
   private baseUrl:string="http://localhost:8084/api/v1/student";

   getStudentList ():Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseUrl)
   }

   createStudent(student:Student):Observable<Student>{
    return this.httpClient.post<Student>(`${this.baseUrl}`,student)
   }

   deleteStudent(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
   }
   getStudentById(id:number):Observable<Student>{
    return this.httpClient.get<Student>(`${this.baseUrl}/${id}`)
   }

   updateStudent(id:number,student:Student):Observable<Object>{
    return this.httpClient.put<Student>(`${this.baseUrl}/${id}`,student)
   }
   getStudentsByCriteria(area?: string, city?: string): Observable<ApiResponse<Student[]>> {
    let params = new HttpParams();
  
    if (area) params = params.set('area', area);
    if (city) params = params.set('city', city);
  
    // return this.httpClient.get<ApiResponse<Student[]>>('http://localhost:8084/api/v1/student/criteria', { params });
    return this.httpClient.get<ApiResponse<Student[]>>(`${this.baseUrl}/criteria`, { params });
  }
  
  getStudentByPagination(page: number, size: number): Observable<PaginatedResponse<Student>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.httpClient.get<PaginatedResponse<Student>>(`${this.baseUrl}/getStudentByPagination`, { params });
  }

}
