import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveDateFormat, saveMoneyFormat } from 'src/app/redux/actions/settings.action';

@Injectable()
export default class FormatService {
  public formatDate = [
    { id: 1, text: 'MM/DD/YYYY' },
    { id: 2, text: 'DD/MM/YYYY' },
    { id: 3, text: 'YYYY/DD/MM' },
    { id: 4, text: 'YYYY/MM/DD' },
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
    // this.formatDate.forEach((item) => {
    //   if (item.id === id) {
    //     this.store.dispatch(saveDateFormat({ dateFormat: item.text }));
    //   } else item.done = '';
    // });
    const dateFormat = this.formatDate
      .find((item) => item.id === id)?.text as string;
    this.store.dispatch(saveDateFormat({ dateFormat }));
  }

  public switchFormatMoney(id: number) {
    const moneyFormat = this.formatMoney
      .find((item) => item.id === id)?.text as string;
    this.store.dispatch(saveMoneyFormat({ moneyFormat }));
  }
}
