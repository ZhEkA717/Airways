import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDateFormat, selectMoneyFormat } from 'src/app/redux/selectors/settings.selector';
import FormatService from '../../services/format.service';
import HeaderService from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent {
  public menuShow = false;

  public formatDate$ = this.store.select(selectDateFormat);

  public formatMoney$ = this.store.select(selectMoneyFormat);

  constructor(
    private router: Router,
    public formatService: FormatService,
    public headerService: HeaderService,
    private store: Store,
  ) {}

  public toMainPage() {
    this.router.navigate(['main']);
  }
}
