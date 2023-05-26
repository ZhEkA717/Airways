import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import AuthService from '@auth/services/auth.service';
import AuthDialogComponent from '@auth/components/auth-dialog/auth-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuth() || this.openAuthModal();
  }

  openAuthModal() {
    this.dialog.open(AuthDialogComponent, {
      enterAnimationDuration: 500,
      exitAnimationDuration: 0,
      hasBackdrop: true,
      position: { top: '0px' },
    });
    return false;
  }
}
