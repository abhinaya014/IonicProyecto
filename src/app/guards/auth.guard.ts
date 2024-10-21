import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['role'];  // Roles esperados para la ruta
    const userRole = this.authService.getRole();  // Rol del usuario logueado

    if (!this.authService.isLoggedIn()) {
      // Si no está logueado, redirigimos al login
      this.router.navigate(['/login']);
      return false;
    }

    // Verificamos si el rol del usuario está en la lista de roles permitidos
    if (expectedRoles.includes(userRole)) {
      return true;
    } else {
      // Si no tiene el rol adecuado, redirigimos al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
