import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  ResolveEnd,
  ResolveStart,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDateFormat, selectMoneyFormat } from 'src/app/redux/selectors/settings.selector';
import { MatDialog } from '@angular/material/dialog';
import AuthDialogComponent from 'src/app/auth/components/auth-dialog/auth-dialog.component';
import { filter, map, mapTo } from 'rxjs/operators';
import { selectAmountCart, selectCartLoading } from 'src/app/redux/selectors/cart.selector';
import { Observable, merge } from 'rxjs';
import FormatService from '../../services/format.service';
import HeaderService from '../../services/header.service';
import AuthService from '../../../auth/services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  public menuShow = false;

  public isNotMain = true;

  public stepperShow = false;

  public formatDate$ = this.store.select(selectDateFormat);

  public formatMoney$ = this.store.select(selectMoneyFormat);

  public isCartLoading$ = this.store.select(selectCartLoading);

  public isLogged = false;

  public isAccount = false;

  public loginButtonCaption = 'Sign in';

  public cartAmount$ = this.store.select(selectAmountCart);

  public isLoading$!: Observable<boolean>;

  private showLoaderEvents$!: Observable<boolean>;

  private hideLoaderEvents$!: Observable<boolean>;

  constructor(
    private router: Router,
    public formatService: FormatService,
    public headerService: HeaderService,
    public authService: AuthService,
    private store: Store,
    public dialog: MatDialog,
    private cartService: CartService,
  ) {
    authService.checkLogin();
    authService.isLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
      this.loginButtonCaption = authService.userName ? 'Profile' : 'Sign in';
    });
    this.getRouterUrl().subscribe((url) => {
      this.isNotMain = url !== 'main';
      this.isAccount = url === 'account';
      this.stepperShow = url === 'booking';
    });
  }

  ngOnInit(): void {
    this.showLoaderEvents$ = this.router.events.pipe(
      filter((event) => event instanceof ResolveStart),
      mapTo(true),
    );
    this.hideLoaderEvents$ = this.router.events.pipe(
      filter((event) => event instanceof ResolveEnd),
      mapTo(false),
    );

    this.isLoading$ = merge(
      this.hideLoaderEvents$,
      this.showLoaderEvents$,
    );
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
      this.router.navigate(['account']);
    } else {
      this.openDialog('500ms', '0ms');
    }
  }

  public logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
