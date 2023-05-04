import { Component, Input } from '@angular/core';
import { Trip } from 'src/app/shared/model/trip.model';
import { Store } from '@ngrx/store';
import { selectMoneyFormat } from 'src/app/redux/selectors/settings.selector';
import CalendarService from '../../services/calendar.service';

@Component({
  selector: 'app-one-date',
  templateUrl: './one-date.component.html',
  styleUrls: ['./one-date.component.scss'],
})
export default class OneDateComponent {
  @Input() day: Trip = <Trip>{};

  @Input() date!: Date;

  @Input() numMonth!: number;

  private formatMoney$ = this.store.select(selectMoneyFormat);

  constructor(
    public calendarService: CalendarService,
    public store: Store,
  ) {}

  public get money() {
    let format!: string;

    this.formatMoney$.subscribe((item) => {
      switch (item) {
        case 'EUR': format = '€';
          break;
        case 'PLN': format = 'zł';
          break;
        case 'RUB': format = '₽';
          break;
        case 'USA': format = '$';
          break;

        default: format = '$';
      }
    });

    return format;
  }
}
