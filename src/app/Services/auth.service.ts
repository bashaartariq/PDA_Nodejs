import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
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
  user: any;
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
  getStates(): Observable<any> {
    return this.http.get(`${this.NodeApiUrl}/getStates`);
  }
  getCity(state: any): Observable<any> {
    return this.http.get(`${this.NodeApiUrl}/getCity/${state}`);
  }
  getPracticeLocation(): Observable<any> {
    return this.http.get(`${this.NodeApiUrl}/getPracticeLocation`);
  }
  getCategory(): Observable<any> {
    return this.http.get(`${this.NodeApiUrl}/getCategory`);
  }
  getPurpose(): Observable<any> {
    return this.http.get(`${this.NodeApiUrl}/getPurposeOfVisit`);
  }
  getCaseType(): Observable<any> {
    return this.http.get(`${this.NodeApiUrl}/getCaseType`);
  }
  getFirm(): Observable<any> {
    return this.http.get(`${this.NodeApiUrl}/getFirm`);
  }
  getInsurance(firm: string): Observable<any> {
    console.log(firm);
    return this.http.get(`${this.NodeApiUrl}/getInsurance/${firm}`);
  }

  submitCase(formData: any): Observable<any> {

    const userId = this.decodeToken()?.userId;
    console.log(userId);
    const dataToSubmit = { ...formData, userId };

    return this.http.post(`${this.NodeApiUrl}/addCase`, dataToSubmit);
  }
}
