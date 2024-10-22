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
  cursoId: number | null = null;

  constructor( private authService: AuthService,
    private route: ActivatedRoute) { }
    ngOnInit() {
      // Verificar si el parámetro 'id' está presente
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.cursoId = +idParam; // Convertir el ID a número
        this.loadNotasAlumno();
      } else {
        console.error('No se encontró el ID del curso en la URL');
      }
    }
  
    loadNotasAlumno() {
      if (this.cursoId) {
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

}
