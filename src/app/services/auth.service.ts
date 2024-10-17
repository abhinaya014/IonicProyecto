import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';




@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private apiUrl = 'http://34.226.133.9:8000/api/user';

  constructor(private http: HttpClient) { }

  login(email: string,password:string): Observable<any>
  {
    return this.http.put(this.apiUrl, {email , password});
  }
}
