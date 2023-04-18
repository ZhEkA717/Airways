import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveDateFormat, saveMoneyFormat } from 'src/app/redux/actions/settings.action';

@Injectable()
export default class FormatService {
  public formatDate = [
    { id: 1, text: 'MM/DD/YYYY', done: 'done' },
    { id: 2, text: 'DD/MM/YYYY', done: '' },
    { id: 3, text: 'YYYY/DD/MM', done: '' },
    { id: 4, text: 'YYYY/MM/DD', done: '' },
  ];

  public formatMoney = [
    { id: 1, text: 'EUR' },
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
        this.store.dispatch(saveDateFormat({ dateFormat: item.text }));
      } else item.done = '';
    });
  }

  public switchFormatMoney(id: number) {
    const formatMoney = this.formatMoney
      .find((item) => item.id === id)?.text as string;
    this.store.dispatch(saveMoneyFormat({ moneyFormat: formatMoney }));
  }
}
