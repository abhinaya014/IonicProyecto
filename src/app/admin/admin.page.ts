import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  cursoId: number = 0;
  alumnos: any[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    // Obtenemos el ID del curso desde la URL
    const id = this.route.snapshot.paramMap.get('id');
    this.cursoId = id ? +id : 0;
    
    // Llamamos al servicio para obtener los alumnos de este curso
    if (this.cursoId > 0) {  // Solo intentamos cargar alumnos si el cursoId es válido
      this.authService.getAlumnosPorCurso(this.cursoId).subscribe(
        (response: any[]) => {
          this.alumnos = response;
        },
        (error: any) => {
          console.error('Error al cargar los alumnos', error);
        }
      );
  }

}
