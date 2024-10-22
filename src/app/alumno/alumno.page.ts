import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  asignaturas: any[] = [];
  cursoId: number = 0;

  constructor( private authService: AuthService,
    private route: ActivatedRoute) { }

    ngOnInit() {
      // Obtenemos el ID del curso desde la URL
      this.cursoId = +this.route.snapshot.paramMap.get('id');
  
      // Cargar las notas del alumno para el curso seleccionado
      this.loadNotasAlumno();
    }
  
    loadNotasAlumno() {
      this.authService.getNotasPorCurso(this.cursoId).subscribe(
        (data: any[]) => {
          this.asignaturas = data;
        },
        (error: any) => {
          console.error('Error al cargar las notas del curso', error);
        }
      );
  }

}
