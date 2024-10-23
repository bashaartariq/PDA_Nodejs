import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpinterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    let authReq = request;
    if(token)
    {
      authReq = request.clone(
        {
          setHeaders:{
            Authorization:`bearer ${token}`
          }
        }
      );
    }
    return next.handle(authReq);
  }
}