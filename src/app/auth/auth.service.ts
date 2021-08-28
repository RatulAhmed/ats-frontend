import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  createUser(email: string, userame: string, password: string) {
    const authData : AuthData = {
      email: email,
      password: password,
      username: userame
    }
    this.http.post('http://localhost:3000/api/auth/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
      const loginData = {
        email: email,
        password: password
      }
      console.log(loginData);
      this.http.post('http://localhost:3000/api/auth/login', loginData)
        .subscribe(response => {
          console.log(response);
        });
  }
}
