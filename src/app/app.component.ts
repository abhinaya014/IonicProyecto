import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home' },
    { title: 'Alta', url: '/alta', icon: 'edit' },
    { title: 'Login', url: '/login', icon: 'login' },
  ];

  
 // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
 user = {
  nombre: '',
  email: '',
  rol: ''
};

isLoggedIn = false;

constructor(private authService: AuthService, private router: Router) {}

ngOnInit() {
  // Verificar si el usuario está logeado
  const userData = this.authService.getUser();
  if (userData) {
    this.user = userData;
    this.isLoggedIn = true;
  } else {
    // Si no está logeado, redirigir al login
    this.router.navigate(['/login']);
  }
}

logout() {
  this.authService.logout();
  this.isLoggedIn = false;
  this.router.navigate(['/login']);
}
}