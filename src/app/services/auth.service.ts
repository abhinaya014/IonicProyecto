import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://kerakha.duckdns.org:8000/api'; 
  private user: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(response => {
        if (response && response.rol) {
          // Guardar los datos del usuario en LocalStorage
          localStorage.setItem('user', JSON.stringify(response));
        }
        return response;
      })
    );
  }

  // Obtener el usuario logueado desde LocalStorage
  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Obtener el rol del usuario logueado
  getRole(): string {
    const user = this.getUser();
    return user ? user.rol : '';
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');  // Verifica si hay datos de usuario en el LocalStorage
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('user');  // Eliminar los datos del usuario del LocalStorage
  }

  getCursos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/curso`);  
  }

  getAlumnosPorCurso(cursoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/curso/${cursoId}/alumnos`);
  }
  
}
