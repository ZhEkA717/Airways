import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDateFormat, selectMoneyFormat } from 'src/app/redux/selectors/settings.selector';
import { MatDialog } from '@angular/material/dialog';
import AuthDialogComponent from 'src/app/auth/components/auth-dialog/auth-dialog.component';
import { filter, map } from 'rxjs/operators';
import { selectAmountCart } from 'src/app/redux/selectors/cart.selector';
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

  public isNotMain = true;

  public stepperShow = false;

  public formatDate$ = this.store.select(selectDateFormat);

  public formatMoney$ = this.store.select(selectMoneyFormat);

  public isLogged = false;

  public isOverlayOpen = false;

  public loginButtonCaption = 'Sign in';

  public cartAmount$ = this.store.select(selectAmountCart);

  constructor(
    private router: Router,
    public formatService: FormatService,
    public headerService: HeaderService,
    public authService: AuthService,
    private store: Store,
    public dialog: MatDialog,
  ) {
    authService.checkLogin();
    authService.isLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
      this.loginButtonCaption = authService.userName || 'Sign in';
    });
    this.getRouterUrl().subscribe((url) => {
      this.isNotMain = url !== 'main';
      this.stepperShow = url === 'booking';
    });
  }

  getRouterUrl() {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split('/')[1]),
    );
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
      this.isOverlayOpen = !this.isOverlayOpen;
    } else {
      this.openDialog('500ms', '0ms');
    }
  }

  public logout() {
    this.isOverlayOpen = false;
    this.authService.logout();
  }
}
