import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {FireService} from "../services/fire.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private srv: FireService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.srv.isSignedIn) { return true; }
    this.router.navigate(['/home']);
    return false;
  }
}
