import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar correctamente el servicio

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
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'administrador';

    // Cargar cursos desde la API
    this.authService.getCursos().subscribe((data: any) => {
      // Asegúrate de que 'data' contenga la estructura correcta
      this.cursos = data.map((curso: { nombre: any; descripcion: any; }) => ({
        nombre: curso.nombre, // Cambia esto si el nombre de campo es diferente
        descripcion: curso.descripcion // Cambia esto si el nombre de campo es diferente
      }));
    }, (error: any) => {
      console.error('Error al cargar cursos', error);
    });
  }
}
