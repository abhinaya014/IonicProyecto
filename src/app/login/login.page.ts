import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://34.226.133.9:8000/api/user', userData).subscribe(
      (response: any) => {
        // Almacenar la respuesta en LocalStorage o SessionStorage
        if (response && response.rol) {
          if (response.rol === 'admin') {
            // Almacenar token/datos y redirigir a la pantalla de administrador
            localStorage.setItem('token', response.token);
            localStorage.setItem('rol', 'administrador');
            this.router.navigate(['/admin-dashboard']);
          } else if (response.rol === 'alumno') {
            // Almacenar token/datos y redirigir a la pantalla de alumno
            localStorage.setItem('token', response.token);
            localStorage.setItem('rol', 'alumno');
            this.router.navigate(['/alumno-dashboard']);
          }
        }
      },
      (      error: any) => {
        console.error('Error en el login', error);
      }
    );
}

}
