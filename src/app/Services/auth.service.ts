import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

interface user {
  userId: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  role: string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  NodeApiUrl: string = environment.NodeApiUrl;
  user: any = {};
  constructor(private http: HttpClient) { }

  decodeToken(): user | null {
    console.log("Calling from Decoder");
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return jwtDecode<user>(token);
      } catch (error) {
        console.error('Invalid token', error);
        return null;
      }
    }
    else {
      return null;
    }
  }


  signup(data: any): Observable<any> {
    return this.http.post(`${this.NodeApiUrl}/signup`, data);
  }

  signin(data: any): Observable<any> {
    return this.http.post(`${this.NodeApiUrl}/signin`, data);
  }

  addInfo(data: any): Observable<any> {
    return this.http.post(`${this.NodeApiUrl}/addPatientInfo`, data);
  }


}
