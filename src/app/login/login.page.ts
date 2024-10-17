import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService) {}

  // Método para manejar el login
  handleLogin() {
    this.authService.getUserByEmail(this.email).subscribe((user: { password: string | undefined; id: any; }) => {
      if (user && user.password === this.password) { // Asegúrate de que estás comparando las contraseñas correctamente
        const userData = {
          id: user.id,
          email: this.email,
          // Otros campos que quieras actualizar
        };
        this.authService.updateUser(userData).subscribe((response: any) => {
          console.log('User updated:', response);
          // Aquí puedes almacenar el token o información en LocalStorage
        });
      } else {
        console.error('Invalid email or password');
      }
    }, (error: any) => {
      console.error('Error fetching user:', error);
    });
  }
}
