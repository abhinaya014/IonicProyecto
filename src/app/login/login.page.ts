import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router,    private alertController: AlertController
  ) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response: { rol: string; }) => {
        if (response.rol === 'administrador') {
          this.router.navigate(['/inicio']);  // Redirige al inicio si es administrador
        } else if (response.rol === 'alumno') {
          this.router.navigate(['/inicio']);  // Redirige al inicio si es alumno
        }
      },
      (error: any) => {
        this.errorMessage = 'Credenciales incorrectas o problemas en el servidor';
        this.showAlert('Error', 'Credenciales incorrectas o problemas en el servidor');      }
    );
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}