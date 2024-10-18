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
    this.authService.login(this.email, this.password).subscribe((user) => {
      if (user.rol === 'admin') {
        this.router.navigate(['/admin']);
      } else if (user.rol === 'alumno') {
        this.router.navigate(['/alumno']);
      }
    }, (error: any) => {
      // Maneja el error de autenticación
      console.log('Login error:', error);
    });
  }
  ngOnInit() {
  }
}
