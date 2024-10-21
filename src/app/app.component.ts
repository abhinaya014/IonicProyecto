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
    this.loadUser();
  }

  loadUser() {
    const userData = this.authService.getUser();
    if (userData && userData.email) {
      this.user = userData;
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}