import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import HttpApiService from '../../core/services/http-api.service';
import { AuthToken } from '../../shared/model/auth-token.model';
import { User } from '../../shared/model/persons.model';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  public accessToken: string;

  private userId: number;

  private errorMessage: BehaviorSubject<string>;

  public errorMessage$: Observable<string>;

  private isLogged: BehaviorSubject<boolean>;

  public isLogged$: Observable<boolean>;

  constructor(private httpApi: HttpApiService) {
    const token = localStorage.getItem('JWT');
    this.accessToken = token ?? '';
    this.userId = 0;
    this.isLogged = new BehaviorSubject(false);
    this.isLogged$ = this.isLogged.asObservable();
    this.errorMessage = new BehaviorSubject('');
    this.errorMessage$ = this.errorMessage.asObservable();
  }

  public login(email: string, password: string) {
    this.httpApi.loginUser(email, password).subscribe({
      next: (data) => {
        this.accessToken = data.accessToken;
        this.userId = data.user.id ?? 0;
        this.isLogged.next(true);
        this.errorMessage.next('');
        localStorage.setItem('JWT', data.accessToken);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.next(error.error);
        this.logout();
      },
    });
  }

  public register(user: User) {
    this.httpApi.registerUser(user).subscribe({
      next: (data) => {
        this.accessToken = data.accessToken;
        this.userId = data.user.id ?? 0;
        this.isLogged.next(true);
        this.errorMessage.next('');
        localStorage.setItem('JWT', data.accessToken);
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
    localStorage.removeItem('JWT');
  }

  public getCurrentUser(): Observable<User> {
    return this.httpApi.getUser(this.userId);
  }

  private parseJwt(token:string): string {
    if (token === '') return 'Empty token';

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
      const authToken: AuthToken = JSON.parse(jsonPayload);
      return authToken.sub;
    } catch (error) {
      return 'Token validation error';
    }
  }
}
