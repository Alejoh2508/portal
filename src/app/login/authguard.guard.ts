import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { ServicioLoginService } from './servicio-login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthguardGuard implements CanActivate {

  constructor(private servicioLogin: ServicioLoginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const routeurl: string = state.url;
    return this.isLogin(routeurl);
  }

  isLogin(routeurl: string) {
    if (this.servicioLogin.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: routeurl } });
  }
}