import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
})
export class AltaPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    const rol = localStorage.getItem('rol');
    if (rol !== 'admin') {
      // Redirigir si no es administrador
      this.router.navigate(['/login']);
    }
  }

}
