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
      map((response: { rol: any; }) => {
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  // Método para cerrar sesión
  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }

  getCursos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/curso`);  
  }

  getAlumnosPorCurso(cursoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/curso/${cursoId}/alumnos`);
  }
  

  asignarAlumnoACurso(alumnoId: number, cursoId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/alumnocurso`, { alumno_id: alumnoId, crso_id: cursoId });
  }
  getAlumnos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }


}
