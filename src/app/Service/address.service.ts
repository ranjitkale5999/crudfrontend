import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../Class/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient:HttpClient) { }


  private baseUrl:string="http://localhost:8084/api/v4/address";

  getAddressList():Observable<Address[]>{
    return this.httpClient.get<Address[]>(this.baseUrl);
  }
}
