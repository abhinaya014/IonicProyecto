import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  cursos: Array<{ nombre: string, descripcion: string }> = [];
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadCursos();
  }

  loadCursos() {
    this.authService.getCursos().subscribe((data: { nombre: string; descripcion: string; }[]) => {
      this.cursos = data;
    }, (error: any) => {
      console.error('Error al cargar los cursos:', error);
    });
  }
}
