import { Component, Input } from '@angular/core';
import CalendarService from '../../services/calendar.service';

@Component({
  selector: 'app-one-date',
  templateUrl: './one-date.component.html',
  styleUrls: ['./one-date.component.scss'],
})
export default class OneDateComponent {
  @Input() day!: number;

  @Input() date!: Date;

  @Input() numMonth!: number;

  @Input() unActive!: boolean;

  constructor(public calendarService: CalendarService) {}
}
