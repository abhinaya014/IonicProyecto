import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home' },
    { title: 'Alta', url: '/alta', icon: 'edit' },
    { title: 'Login', url: '/login', icon: 'login' },
  ];

  user = {
    nombre: '',
    email: '',
    rol: ''
  };

  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  // Método para verificar si el usuario está logueado
  checkLoginStatus() {
    const userData = this.authService.getUser(); // Obtener usuario de localStorage
    if (userData && userData.email) { // Si hay un email, consideramos que está logueado
      this.user = userData; // Asignamos los datos del usuario
      this.isLoggedIn = true; // Cambiamos el estado a logueado
    } else {
      this.isLoggedIn = false;
      this.router.navigate(['/login']); // Si no está logueado, redirigir al login
    }
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout(); // Llamamos al servicio de logout
    this.isLoggedIn = false; // Cambiamos el estado de sesión
    this.user = { nombre: '', email: '', rol: '' }; // Limpiamos los datos del usuario
    this.router.navigate(['/login']); // Redirigimos al login
  }
}
