import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response: { success: boolean; token: string; role: string; }) => {
        if (response.success) {
          // Almacenar el token y rol en LocalStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);

          // Redirigir según el rol
          if (response.role === 'administrador') {
            this.router.navigate(['/alta']);
          } else if (response.role === 'alumno') { 
            this.router.navigate(['/inicio']);
          }
        } else {
          console.log('Credenciales incorrectas');
        }
      },
      (      error: any) => {
        console.error('Error en la solicitud de login:', error);
        console.log('Credenciales incorrectas');
      }
    );
  }

  ngOnInit() {
  }
}
