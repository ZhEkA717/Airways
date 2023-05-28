import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getCart, resetCart } from 'src/app/redux/actions/cart.action';
import AlertService from 'src/app/shared/services/alert.service';
import HttpApiService from '../../core/services/http-api.service';
import { AuthToken } from '../../shared/model/auth-token.model';
import { User } from '../../shared/model/persons.model';
import { UserResponse } from '../../shared/model/response.model';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  public accessToken: string;

  public userId: number;

  public userName: string;

  public userEmail: string;

  private errorMessage: BehaviorSubject<string>;

  public errorMessage$: Observable<string>;

  private isLogged: BehaviorSubject<boolean>;

  public isLogged$: Observable<boolean>;

  constructor(
    private httpApi: HttpApiService,
    private alertService: AlertService,
    private store: Store,
  ) {
    const token = localStorage.getItem('JWT');
    this.accessToken = token ?? '';
    this.userId = 0;
    this.userName = '';
    this.userEmail = '';
    this.isLogged = new BehaviorSubject(false);
    this.isLogged$ = this.isLogged.asObservable();
    this.errorMessage = new BehaviorSubject('');
    this.errorMessage$ = this.errorMessage.asObservable();
  }

  public login(email: string, password: string) {
    this.httpApi.loginUser(email, password).subscribe({
      next: (data) => {
        this.saveLoginInfo(data);
        this.alertService.success(`Welcome ${data.user.firstName}!`);
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.error(error.error);
        this.logout();
      },
    });
  }

  public register(user: User) {
    this.httpApi.registerUser(user).subscribe({
      next: (data) => {
        this.saveLoginInfo(data);
        this.httpApi.createCart(data.user.id || 0).subscribe();
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.error(error.error);
        this.logout();
      },
    });
  }

  private saveLoginInfo(data: UserResponse) {
    this.accessToken = data.accessToken;
    this.userId = data.user.id ?? 0;
    this.userName = `${data.user.firstName} ${data.user.lastName}`;
    this.userEmail = data.user.email;
    this.isLogged.next(true);
    this.errorMessage.next('');
    localStorage.setItem('JWT', data.accessToken);
    this.store.dispatch(getCart({ userId: this.userId }));
  }

  public logout() {
    this.accessToken = '';
    this.userId = 0;
    this.userName = '';
    this.userEmail = '';
    this.isLogged.next(false);
    localStorage.removeItem('JWT');
    this.store.dispatch(resetCart());
  }

  public getCurrentUser(): Observable<User> {
    return this.httpApi.getUser(this.userId);
  }

  public checkLogin() {
    const token = localStorage.getItem('JWT');
    if (token) {
      const id = parseInt(this.parseJwt(token), 10);
      this.userId = id;
      if (id) {
        this.httpApi.getUser(id)
          .subscribe({
            next: (user) => {
              this.saveLoginInfo({ accessToken: token, user });
            },
            error: (error: HttpErrorResponse) => {
              this.errorMessage.next(error.error);
              this.logout();
            },
          });
      }
    }
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

  public isAuth() {
    return !!this.accessToken;
  }
}
