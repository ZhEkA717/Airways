import { Component, Input } from '@angular/core';
import { Trip } from 'src/app/shared/model/trip.model';
import CalendarService from '../../services/calendar.service';
import ConvertMoneyService from '../../services/convert-money.service';

@Component({
  selector: 'app-one-date',
  templateUrl: './one-date.component.html',
  styleUrls: ['./one-date.component.scss'],
})
export default class OneDateComponent {
  @Input() day: Trip = <Trip>{};

  @Input() date!: Date;

  @Input() numMonth!: number;

  constructor(
    public calendarService: CalendarService,
    public convertMoneyService: ConvertMoneyService,
  ) {}
}
