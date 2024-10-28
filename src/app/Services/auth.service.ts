import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';
import { user } from '../model/interfaces';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  NodeApiUrl: string = environment.NodeApiUrl;
  user: any;
  patient: any;
  getSignin: boolean = false;
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

  getPatientInfo(): Observable<any> {
    const userId = this.decodeToken()?.userId;
    return this.http.get(`${this.NodeApiUrl}/getPatientInfo/${userId}`);
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
  getInsurance(): Observable<any> {
    return this.http.get(`${this.NodeApiUrl}/getInsurance`);
  }
  submitCase(formData: any): Observable<any> {
    const userId = this.decodeToken()?.userId;
    console.log(userId);
    const dataToSubmit = { ...formData, userId };
    return this.http.post(`${this.NodeApiUrl}/addCase`, dataToSubmit);
  }
  
  createDoctor(formData: any): Observable<any> {
    return this.http.post(`${this.NodeApiUrl}/addDoctorInfo`, formData);
  }
  
  getSpecailiy(): Observable<any> {
    return this.http.get(`${this.NodeApiUrl}/getSpeciality`);
  }
  
  getCases(): Observable<any> {
    const user_id = this.decodeToken()?.userId;
    return this.http.get(`${this.NodeApiUrl}/getCases/${user_id}`);
  }

  getAppointmentsType(): Observable<any> {
    return this.http.get(`${this.NodeApiUrl}/getAppointmentTypes`);
  }
  
  getDoctorByPracticeLocationAndSpeciality(PracticeLocationId: number, SpecialityId: number): Observable<any> {
    return this.http.get(`${this.NodeApiUrl}/getDoctor/${PracticeLocationId}/${SpecialityId}`);
  }
  
  addAppointment(formData: any): Observable<any> {
    return this.http.post(`${this.NodeApiUrl}/addAppointment`, formData);
  }

  getAppointment(case_id:number):Observable<any>
  {
    return this.http.get(`${this.NodeApiUrl}/getAppointment/${case_id}`);
  }

}