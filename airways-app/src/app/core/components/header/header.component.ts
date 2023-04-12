import { Component } from '@angular/core';
import { Router } from '@angular/router';
import SelectsService from '../../services/selects.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent {
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
    private router: Router,
    private selectService: SelectsService,
  ) {}

  public switchFormatDate(id: number) {
    this.formatDate.forEach((item) => {
      if (item.id === id) {
        item.done = 'done';
        this.valueDate = item.text;
      } else item.done = '';
    });
    this.selectService.setFormateDate(this.valueDate);
  }

  public switchFormatMoney(id: number) {
    this.formatMoney.forEach((item) => {
      if (item.id === id) this.valueMoney = item.text;
    });
  }

  public toMainPage() {
    this.router.navigate(['main']);
  }
}
