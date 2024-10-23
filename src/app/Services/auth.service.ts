import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  NodeApiUrl:string = environment.NodeApiUrl;
  user:object = {};
  constructor(private http:HttpClient) { }

  signup(data:any):Observable<any>
  {
    return this.http.post(`${this.NodeApiUrl}/signup`,data);
  }

  signin(data:any):Observable<any>
  {
    return this.http.post(`${this.NodeApiUrl}/signin`,data);
  }

  addInfo(data:any):Observable<any>
  {
    return this.http.post(`${this.NodeApiUrl}/addPatientInfo`,data);
  }


}
