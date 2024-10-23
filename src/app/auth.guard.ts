import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const allowedRoles: string[] = route.data['roles'];
    const userRole = this.getUserRole();
    if (!allowedRoles.includes(userRole)) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
  getUserRole(): string {
    return localStorage.getItem('userRole') || 'guest';
  }
}
