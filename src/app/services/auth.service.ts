import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // private apiUrl = 'http://34.226.133.9:8000/api/login'; 
  private cursosUrl = 'http://34.226.133.9:8000/api/curso'; 

  private user: any;


  constructor(private http: HttpClient) {}
  

  // Método para obtener un usuario por email
  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?email=${email}`);
  }



  getUser() {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.user != null;
  }

  logout() {
    this.user = null;
  }


  getCursos(): Observable<any> {
    return this.http.get(this.cursosUrl);
  }
}
