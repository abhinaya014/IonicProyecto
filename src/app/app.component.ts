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

  // Datos del usuario, que se mostrarán en el perfil cuando esté logueado
  user = {
    nombre: '',
    email: '',
    rol: ''
  };

  isLoggedIn = false; // Estado para verificar si el usuario está logueado

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Verificamos si hay un usuario logueado al iniciar la aplicación
    const userData = this.authService.getUser();
    if (userData && userData.email) { // Verificamos si el usuario tiene un email (significa que está logueado)
      this.user = userData; // Asignamos los datos del usuario
      this.isLoggedIn = true; // Cambiamos el estado a logueado
    } else {
      // Si no hay usuario logueado, redirigimos al login
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }

  logout() {
    // Llamamos al servicio de logout
    this.authService.logout();
    // Cambiamos el estado a no logueado
    this.isLoggedIn = false;
    // Redirigimos al login tras cerrar sesión
    this.router.navigate(['/login']);
  }
}
