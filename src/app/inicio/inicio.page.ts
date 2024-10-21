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
  userRole: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Obtener los cursos cuando se carga la página
    this.authService.getCursos().subscribe(
      (data: any) => {
        this.cursos = data;
      },
      (error: any) => {
        console.error('Error al cargar los cursos', error);
      }
    );

    // Obtener el rol del usuario almacenado
    this.userRole = this.authService.getRole();
  }

  onCursoClick(curso: any) {
    // Redirigir según el rol del usuario
    if (this.userRole === 'administrador') {
      this.router.navigate(['/admin', curso.id]);  // Navegar a la página de admin con el ID del curso
    } else if (this.userRole === 'alumno') {
      this.router.navigate(['/alumno', curso.id]);  // Navegar a la página de alumno con el ID del curso
    }
  }
}