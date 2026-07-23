import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import {
  EMPTY,
  Observable,
  catchError,
} from 'rxjs';
import { User } from '../shared/model/persons.model';
import AuthService from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export default class CurrentUserResolver implements Resolve<User> {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  resolve(): Observable<User> {
    return this.authService.getCurrentUser()
      .pipe(
        catchError(() => {
          this.router.navigate(['main']);
          return EMPTY;
        }),
      );
  }
}
