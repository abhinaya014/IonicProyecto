import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';  // Importar AlertController



@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
})
export class AltaPage implements OnInit {

  alumnos: any[] = [];
  cursos: any[] = [];
  filteredAlumnos: any[] = []; 

  selectedAlumno: number | null = null;
  selectedCurso: number | null = null;

  constructor(private authService: AuthService, private alertController: AlertController) {}



  ngOnInit() {
    this.loadAlumnos();
    this.loadCursos();
  }

  loadAlumnos() {
    this.authService.getAlumnos().subscribe((data: any[]) => {
      this.alumnos = data;
      this.filteredAlumnos = [...this.alumnos]; // Mostrar todos los alumnos al inicio

    });
  }

  loadCursos() {
    this.authService.getCursos().subscribe((data: any[]) => {
      this.cursos = data;
    });
  }

  filterAlumnos(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      this.filteredAlumnos = this.alumnos.filter(alumno => 
        alumno.nombre.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredAlumnos = this.alumnos;  // Mostrar todos si no hay búsqueda
    }
  }
  async asignarAlumno() {
    if (this.selectedAlumno && this.selectedCurso) {
      console.log('Alumno seleccionado:', this.selectedAlumno);
      console.log('Curso seleccionado:', this.selectedCurso);
  
      this.authService.asignarAlumnoACurso(this.selectedAlumno, this.selectedCurso).subscribe(
        async (response: any) => {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Alumno asignado correctamente al curso',
            buttons: ['OK']
          });
          await alert.present();
        },
        async (error: { status: number; }) => {
          let message = 'Ocurrió un error al asignar el alumno';
          if (error.status === 400) {
            message = 'El alumno ya está asignado a este curso';
          }
          const alert = await this.alertController.create({
            header: 'Error',
            message: message,
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    } else {
      this.presentAlert('Error', 'Debes seleccionar un alumno y un curso.');
    }
  }
  
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
