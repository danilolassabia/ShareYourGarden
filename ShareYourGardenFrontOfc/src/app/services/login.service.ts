import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInterface } from '../interfaces/login-interface';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { GardenerInterface } from '../interfaces/gardener-interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  apiUrl = "http://localhost:8080/api/login";


  constructor() { }


  login(email: any, password: any): Observable<string> {
    let login: LoginInterface = {
      username: email,
      password: password
    }
    return this.http.post<string>(this.apiUrl, login, {responseType: 'text' as 'json'});
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return "";
  }

  getLoggedGardener() {
    return this.jwtDecode() as GardenerInterface;
  }


}
