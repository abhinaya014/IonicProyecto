import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  cursos: any[] = [];
  user: any;



  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.authService.getUser();

    // Si el usuario es alumno, obtenemos solo los cursos asignados a él
    if (this.user.rol === 'alumno') {
      this.authService.getCursosPorAlumno(this.user.id).subscribe(
        (data: any[]) => {
          this.cursos = data;
        },
        (error: any) => {
          console.error('Error al obtener cursos del alumno', error);
        }
      );
    } else if (this.user.rol === 'administrador') {
      // Si es administrador, mostramos todos los cursos
      this.authService.getCursos().subscribe(
        (data: any[]) => {
          this.cursos = data;
        },
        (error: any) => {
          console.error('Error al obtener todos los cursos', error);
        }
      );

    }
  }
    onCursoClick(curso: any) {
      if (this.user.rol === 'alumno') {
        // Redirigir a la página de alumno con el ID del curso
        this.router.navigate(['/alumno', curso.id]);
      } else if (this.user.rol === 'administrador') {
        // Redirigir a la página de admin con el ID del curso
        this.router.navigate(['/admin', curso.id]);
      }
    }
}