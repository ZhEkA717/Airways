import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import SelectsService from 'src/app/core/services/selects.service';

const moment = _moment;

export const format = {
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
  },
};
@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: format },
  ],
})
export default class FlightFormComponent implements OnInit {
  public tripPosition: 'round' | 'one' = 'round';

  public fromControl = new FormControl('');

  public destinationControl = new FormControl('');

  public options: string[] = ['One', 'Two', 'Three'];

  public passengers = [
    {
      id: 0,
      view: 'Adults',
      description: '14+ years',
      value: 1,
    },
    {
      id: 1,
      view: 'Child',
      description: '2-14 years',
      value: 1,
    },
    {
      id: 2,
      view: 'Infant',
      description: '0-2 years',
      value: 0,
    },
  ];

  public date = new FormControl(moment());

  public isChoiceInput = false;

  public placeholder = 'Passenger';

  constructor(public selectService: SelectsService) {}

  ngOnInit(): void {
    this.selectService.formateDate$.subscribe((formatDate) => {
      format.display.dateInput = formatDate;
    });
  }

  onChangeDirection() {
    const fromValue = this.fromControl.value;
    const destinationValue = this.destinationControl.value;
    this.fromControl.setValue(destinationValue);
    this.destinationControl.setValue(fromValue);
  }

  setMonthAndYear(normalizedMonthAndYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue?.month(normalizedMonthAndYear.month());
    ctrlValue?.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
  }

  onFocus(event: Event) {
    const el = event.target as HTMLElement;
    const elCurr = event.currentTarget as HTMLElement;
    if (elCurr.classList.contains('passenger')
      && !el.classList.contains('counter')) {
      this.isChoiceInput = !this.isChoiceInput;
    }
    this.updatePlaceholder();
  }

  increment(num: number) {
    if (this.passengers[num].value < 10) {
      this.passengers[num].value = this.passengers[num].value + 1;
      this.updatePlaceholder();
    }
  }

  decrement(num: number) {
    if (this.passengers[num].value !== 0) {
      this.passengers[num].value = this.passengers[num].value - 1;
      this.updatePlaceholder();
    }
  }

  updatePlaceholder() {
    this.placeholder = '';
    this.passengers.forEach((item, i, arr) => {
      if (item.value > 0) this.placeholder += `${item.value} ${item.view}, `;
      if (arr.length - 1 === i) this.placeholder = this.placeholder.slice(0, -2);
      if (!this.isChoiceInput) this.placeholder = this.cutPlaceholder(this.placeholder, 20);
    });
    if (!this.passengers.reduce((start, item) => start + item.value, 0)) this.placeholder = 'Passenger';
  }

  cutPlaceholder(text: string, num: number) {
    return text.length > num ? `${text.slice(0, num)}...` : text;
  }
}
