import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveDateFormat, saveMoneyFormat } from 'src/app/redux/actions/settings.action';

@Injectable()
export default class FormatService {
  public valueDate = 'MM/DD/YYYY';

  public valueMoney = 'EUR';

  public formatDate = [
    { id: 1, text: this.valueDate, done: 'done' },
    { id: 2, text: 'DD/MM/YYYY', done: '' },
    { id: 3, text: 'YYYY/DD/MM', done: '' },
    { id: 4, text: 'YYYY/MM/DD', done: '' },
  ];

  public formatMoney = [
    { id: 1, text: this.valueMoney },
    { id: 2, text: 'USA' },
    { id: 3, text: 'RUB' },
    { id: 4, text: 'PLN' },
  ];

  constructor(
    private store: Store,
  ) {}

  public switchFormatDate(id: number) {
    this.formatDate.forEach((item) => {
      if (item.id === id) {
        item.done = 'done';
        this.valueDate = item.text;
      } else item.done = '';
    });
    this.store.dispatch(saveDateFormat({ dateFormat: this.valueDate }));
  }

  public switchFormatMoney(id: number) {
    this.valueMoney = this.formatMoney
      .find((item) => item.id === id)?.text as string;
    this.store.dispatch(saveMoneyFormat({ moneyFormat: this.valueMoney }));
  }
}
