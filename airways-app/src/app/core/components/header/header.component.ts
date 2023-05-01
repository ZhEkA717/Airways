import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDateFormat, selectMoneyFormat } from 'src/app/redux/selectors/settings.selector';
import { MatDialog } from '@angular/material/dialog';
import AuthDialogComponent from 'src/app/auth/components/auth-dialog/auth-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import FormatService from '../../services/format.service';
import HeaderService from '../../services/header.service';
import AuthService from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent {
  public menuShow = false;

  public formatDate$ = this.store.select(selectDateFormat);

  public formatMoney$ = this.store.select(selectMoneyFormat);

  public isLogged = false;

  public loginButtonCaption = 'Sign in';

  constructor(
    private router: Router,
    public formatService: FormatService,
    public headerService: HeaderService,
    public authService: AuthService,
    private store: Store,
    public dialog: MatDialog,
    private logoutBar: MatSnackBar,
  ) {
    authService.isLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
      this.loginButtonCaption = authService.userName || 'Sign in';
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(AuthDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      hasBackdrop: true,
      position: { top: '0px' },
    });
  }

  public auth() {
    if (this.isLogged) {
      this.logoutBar.open('logout', 'ok', { horizontalPosition: 'end', verticalPosition: 'top' });
    } else {
      this.openDialog('500ms', '0ms');
    }
  }

  public toMainPage() {
    this.router.navigate(['main']);
  }
}
