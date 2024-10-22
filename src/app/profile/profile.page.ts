import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = {
    nombre: '',
    email: '',
    rol: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const userData = this.authService.getUser();
    if (userData) {
      this.user = userData;
    } else {
      this.router.navigate(['/login']);  // Si no hay usuario logueado, redirigir al login
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
