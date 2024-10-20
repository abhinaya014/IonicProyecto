import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getCursos() {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://kerakha.duckdns.org:8080/api'; // Reemplaza con tu API de Symfony

  private user: any = null;

  constructor(private http: HttpClient) {}

  // Método de login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response: { rol: any; }) => {
        if (response && response.rol) {
          this.user = response;
          // Guardar el usuario en LocalStorage
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        return response;
      })
    );
  }

  // Obtener el usuario logeado desde LocalStorage
  getUser() {
    return this.user || JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Verificar si el usuario está logeado
  isLoggedIn(): boolean {
    return this.getUser() !== null && !!this.getUser().rol;
  }

  // Obtener el rol del usuario
  getRole(): string {
    const user = this.getUser();
    return user ? user.rol : '';
  }

  // Cerrar sesión
  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }
}
