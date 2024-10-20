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
 
  }
}
