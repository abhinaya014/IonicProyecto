import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://34.226.133.9:8000/api/user'; // Cambia a HTTPS


  constructor(private http: HttpClient) {}
  

  // Método para obtener un usuario por email
  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?email=${email}`);
  }

  // Método para el login
  login(email: string, password: string): Observable<any> {
    return this.getUserByEmail(email);
  }

  // Método para actualizar el usuario
  updateUser(userData: any): Observable<any> {
    return this.http.put(this.apiUrl, userData);
  }
}
