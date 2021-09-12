import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = '';
  private userId : string | null = '';
  private expiresIn: number = 0;
  private username: string | null = '';
  private isAuthenticated = false;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http : HttpClient, private router: Router ) { }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuth() {
    return this.isAuthenticated;
  }

  createUser(email: string, userame: string, password: string) {
    const authData : AuthData = {
      email: email,
      password: password,
      username: userame
    }
    this.http.post('http://localhost:3000/api/auth/signup', authData)
      .subscribe(response => {
      });
  }

  login(email: string, password: string) {
      const loginData = {
        email: email,
        password: password
      }
      this.http.post<{token: string, userId: string, expiresIn:number, username: string }>('http://localhost:3000/api/auth/login', loginData)
        .subscribe(response => {
           this.token = response.token;
           this.userId = response.userId;
           this.expiresIn = response.expiresIn;
           this.username = response.username;

           if(this.token) {
            const expiresInDuration = response.expiresIn;
            // TODO refactor into private method
            this.tokenTimer = window.setTimeout(() => {
              this.logout();
            }, expiresInDuration * 1000);

            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            this.saveAuthData(this.token, expirationDate, this.username, this.userId )
            this.router.navigate(['/dashboard']);
           }
        });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();

    const expiresIn = authInformation!.expiration.getTime() - now.getTime();
      if(expiresIn > 0) {
        this.token = authInformation!.token;
        this.isAuthenticated = true;
        this.tokenTimer = window.setTimeout(() => {
          this.logout();
        }, expiresIn * 1000);
        this.authStatusListener.next(true);
        this.userId = authInformation!.userId;
        this.username = authInformation!.username;
      }
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    window.clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);

  }
  private saveAuthData(token:string, expirationDate: Date, username: string, userId:string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');

    if(!token || !expirationDate) {
      return;
    }
    return {
        token: token,
        expiration: new Date(expirationDate),
        username: username,
        userId: userId
      }
    }
  }
