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

  constructor(private authService: AuthService, private router: Router) {}

  // Método para manejar el login
  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (      response: { rol: string; }) => {
        if (response.rol === 'administrador') {
          this.router.navigate(['/inicio']);
        } else if (response.rol === 'alumno') {
          this.router.navigate(['/alta']);
        }
      },
      (      error: any) => {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}
