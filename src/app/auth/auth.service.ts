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
      email: 'hello@test.com',
      password:'test',
      username: 'test'
    }
    this.http.post('http://localhost:3000/hello', authData)
      .subscribe(response => {
        console.log(response);
      });
  }
}
