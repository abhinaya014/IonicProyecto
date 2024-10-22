import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    const userData = this.authService.getUser();
    if (userData) {
      this.user = userData;
      this.imageUrl = this.user.image; // Cargar la URL de la imagen si existe
    }
  }

  // Tomar foto con la cámara
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    if (image) {
      this.saveImage(image);
    }
  }

  // Guardar la imagen en el sistema de archivos y actualizar el perfil
  async saveImage(photo: any) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    this.imageUrl = photo.webPath;

    // Aquí puedes llamar a un servicio de tu backend para guardar la imagen en la base de datos
    this.authService.updateProfileImage(this.imageUrl).subscribe(() => {
      console.log('Imagen actualizada correctamente');
    });
  }

  // Convertir la imagen en Base64
  private async readAsBase64(photo: any) {
    const response = await fetch(photo.webPath);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }
}
