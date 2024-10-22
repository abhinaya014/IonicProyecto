import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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
    rol: '',
    image: ''
  };
  imageUrl: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    // Cargar los datos del usuario y la imagen desde la base de datos
    const userData = this.authService.getUser();
    if (userData) {
      this.user = userData;
      this.imageUrl = this.user.image ? `http://kerakha.duckdns.org:8000/images/${this.user.image}` : null;
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, // DataUrl para enviar la imagen al servidor como base64
      source: CameraSource.Camera
    });

    if (image) {
      this.imageUrl = image.dataUrl; // Mostrar la imagen inmediatamente en el perfil
      this.saveImage(image.dataUrl);  // Guardar la imagen en la base de datos
    }
  }

  saveImage(base64Image: string) {
    // Aquí enviamos la imagen al servidor
    this.authService.updateProfileImage(base64Image).subscribe(() => {
      console.log('Imagen subida correctamente');
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
