import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import HttpApiService from '../../core/services/http-api.service';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  public accessToken: string;

  private userId: number;

  private errorMessage: BehaviorSubject<string>;

  private isLogged: BehaviorSubject<boolean>;

  public isLogged$: Observable<boolean>;

  constructor(private httpApi: HttpApiService) {
    this.accessToken = '';
    this.userId = 0;
    this.isLogged = new BehaviorSubject(false);
    this.isLogged$ = this.isLogged.asObservable();
    this.errorMessage = new BehaviorSubject('');
  }

  public login(email: string, password: string) {
    this.httpApi.loginUser(email, password).subscribe({
      next: (data) => {
        this.accessToken = data.accessToken;
        this.userId = data.user.id ?? 0;
        this.isLogged.next(true);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.next(error.error);
        this.logout();
      },
    });
  }

  public logout() {
    this.accessToken = '';
    this.userId = 0;
    this.isLogged.next(false);
  }

  private parseJwt(token:string) {
    if (token === '') return 'Empty token';
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    try {
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      return 'Token validation error';
    }
  }
}
