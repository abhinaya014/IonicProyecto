import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response: { rol: string; }) => {
        if (response.rol === 'administrador') {
          this.router.navigate(['/admin']); // Ruta para administradores
        } else if (response.rol === 'alumno') {
          this.router.navigate(['/alumno']); // Ruta para alumnos
        } else {
          this.errorMessage = 'Rol desconocido';
        }
      },
      (error: any) => {
        this.errorMessage = 'Credenciales incorrectas o problemas en el servidor';
      }
    );
  }
}