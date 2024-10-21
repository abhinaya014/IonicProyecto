import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
})
export class AltaPage implements OnInit {

  alumnos: any[] = [];
  cursos: any[] = [];
  selectedAlumno: number | null = null;
  selectedCurso: number | null = null;

  constructor(private authService: AuthService) {}


  ngOnInit() {
    // Cargar los alumnos y los cursos
    this.authService.getAlumnos().subscribe((alumnos: any[]) => {
      this.alumnos = alumnos;
    });

    this.authService.getCursos().subscribe((cursos: any[]) => {
      this.cursos = cursos;
    });
  }

  asignarAlumnoCurso() {
    if (this.selectedAlumno && this.selectedCurso) {
      this.authService.asignarAlumnoACurso(this.selectedAlumno, this.selectedCurso).subscribe(
        (response: any) => {
          console.log('Alumno asignado con éxito', response);
        },
        (error: any) => {
          console.error('Error al asignar alumno al curso', error);
        }
      );
    } else {
      console.log('Debes seleccionar un alumno y un curso');
    }
  }
}
