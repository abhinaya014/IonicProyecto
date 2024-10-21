import { Component } from '@angular/core';
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

constructor(private authService: AuthService) {}
ngOnInit() {
  this.user = this.authService.getUser();
}
}
