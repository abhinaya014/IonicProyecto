import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';

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
    this.authService.login(this.email, this.password).subscribe((response: { sucess: any; token: string; role: string; }) => {
      if(response.sucess) {
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        if(response.role == 'administrador') {
          this.router.navigate(['/alta']);
        } else if (response.role == 'alumno') { 
          this.router.navigate(['/inicio']);
          
        } else {
          console.log('Credenciales incorrectas');
        }

        
      }
    })
  }

  ngOnInit() {
  }

}
