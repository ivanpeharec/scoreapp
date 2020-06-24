import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private service: UserService) { }

  // Determines if the currently logged in user can activate the route and see the content of it.
  // If the user is not allowed to activate the route, we are navigating to login screen. 
  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (localStorage.getItem('token') != null) {
      let roles = next.data['permittedRoles'] as Array<string>;
      if (roles) {
        if (this.service.roleMatch(roles)) {
          return true;
        }
        else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
      return true;
    }
    else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
