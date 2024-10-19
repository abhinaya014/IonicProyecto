import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private apiUrl = 'http://34.226.133.9:8000/api'; 
  private cursosUrl = 'http://34.226.133.9:8000/api/curso'; 

  private user: any = null;


  constructor(private http: HttpClient) {}
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
  getUser() {
    return this.user || JSON.parse(localStorage.getItem('user'));
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  getRole(): string {
    const user = this.getUser();
    return user ? user.rol : '';
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }
}
