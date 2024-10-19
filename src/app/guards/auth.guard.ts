import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.authService.getRole();

    // Verificar si el usuario está autenticado y tiene el rol adecuado
    if (this.authService.isLoggedIn() && userRole === expectedRole) {
      return true;
    }

    // Si no está autenticado o no tiene el rol correcto, redirigir al login
    this.router.navigate(['/login']);
    return false;
  }
}
