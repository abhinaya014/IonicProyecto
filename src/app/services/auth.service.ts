import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://kerakha.duckdns.org:8000/api'; // URL de la API de Symfony
  private user: any = null;

  constructor(private http: HttpClient, private router: Router) {}

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

  getUser() {
    return this.user || JSON.parse(localStorage.getItem('users') || '{}');
  }


  getRole(): string {
    const user = this.getUser();
    return user ? user.rol : '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');  // Verifica si existe un usuario guardado
  }

  // Método para cerrar sesión
  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }

  getCursos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/curso`);  
  }
  
}
