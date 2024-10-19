import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://34.226.133.9:8000/api'; 
  private cursosUrl = `${this.apiUrl}/curso`;  // URL para obtener los cursos

  private user: any = null;

  constructor(private http: HttpClient) {}

  // Método para login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response: { rol: any; }) => {
        if (response && response.rol) {
          this.user = response;
          // Guardar el usuario en LocalStorage o SessionStorage
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        return response;
      })
    );
  }

  // Método para obtener los cursos
  getCursos(): Observable<any> {
    return this.http.get<any>(this.cursosUrl).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  // Obtener el usuario actual
  getUser() {
    return this.user || JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Verificar si el usuario está logeado
  isLoggedIn(): boolean {
    return this.getUser() !== null && this.getUser().rol !== undefined;
  }

  // Obtener el rol del usuario
  getRole(): string {
    const user = this.getUser();
    return user ? user.rol : '';
  }

  // Método para cerrar sesión
  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }
}
