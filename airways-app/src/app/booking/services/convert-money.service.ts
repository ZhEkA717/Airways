import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMoneyFormat } from '@redux/selectors/settings.selector';

@Injectable({
  providedIn: 'root',
})
export default class ConvertMoneyService {
  private formatMoney$ = this.store.select(selectMoneyFormat);

  public moneyIcon!: string;

  public moneyRatio!: number;

  constructor(
    public store: Store,
  ) {
    this.formatMoney$.subscribe((item) => {
      switch (item) {
        case 'EUR': {
          this.moneyIcon = '€';
          this.moneyRatio = 0.9;
          break;
        }
        case 'PLN': {
          this.moneyIcon = 'zł';
          this.moneyRatio = 4.15;
          break;
        }
        case 'RUB': {
          this.moneyIcon = '₽';
          this.moneyRatio = 78.6;
          break;
        }
        case 'USA': {
          this.moneyIcon = '$';
          this.moneyRatio = 1;
          break;
        }

        default: {
          this.moneyIcon = '$';
          this.moneyRatio = 1;
        }
      }
    });
  }
}
