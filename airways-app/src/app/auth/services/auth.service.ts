import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import HttpApiService from '../../core/services/http-api.service';
import { AuthToken } from '../../shared/model/auth-token.model';

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
    const token2 = localStorage.getItem('JWT');
    this.accessToken = token2 ?? '';
    // if (!this.parseJwt(this.accessToken).error) {
    //   console.log('error');
    // }
    this.userId = 0;
    this.isLogged = new BehaviorSubject(false);
    this.isLogged$ = this.isLogged.asObservable();
    this.errorMessage = new BehaviorSubject('');
    this.errorMessage$ = this.errorMessage.asObservable();
    console.log(this.parseJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1c3RvbWVyMUBhaXJ3YXlzLmNvbSIsImlhdCI6MTY4MjU5NzkzOSwiZXhwIjoxNjgyNjAxNTM5LCJzdWIiOiIyIn0.4GlrdumIVG9UujqefGXYBHo3V7QJtYYFZCgccQtep9Y'));
  }

  public login(email: string, password: string) {
    this.httpApi.loginUser(email, password).subscribe({
      next: (data) => {
        this.accessToken = data.accessToken;
        this.userId = data.user.id ?? 0;
        this.isLogged.next(true);
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
