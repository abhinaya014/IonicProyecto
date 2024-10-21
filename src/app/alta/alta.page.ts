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

  constructor(private authService: AuthService,    private alertController: AlertController 
  ) {}


  ngOnInit() {
    // Cargar los alumnos y los cursos
    this.authService.getAlumnos().subscribe((alumnos: any[]) => {
      this.alumnos = alumnos;
      this.filteredAlumnos = [...this.alumnos]; // Mostrar todos los alumnos al inicio


    });

    this.authService.getCursos().subscribe((cursos: any[]) => {
      this.cursos = cursos;
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

  asignarAlumnoCurso() {
    if (this.selectedAlumno && this.selectedCurso) {
      this.authService.asignarAlumnoACurso(this.selectedAlumno, this.selectedCurso).subscribe(
        async (response: any) => {
          // Mostrar alerta de éxito
          await this.presentAlert('Éxito', 'El alumno ha sido asignado correctamente al curso.');
        },
        async (error: any) => {
          // Mostrar alerta de error
          await this.presentAlert('Error', 'Hubo un problema al asignar el alumno al curso. Inténtalo de nuevo.');
        }
      );
    } else {
      // Si no se seleccionó ningún alumno o curso, mostrar una alerta
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
