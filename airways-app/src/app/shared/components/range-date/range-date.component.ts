import {
  Component,
  OnInit,
} from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Moment } from 'moment';
import RangeDateService from '../../services/range-date.service';

export const MY_FORMAT = {
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
  },
};

@Component({
  selector: 'app-range-date',
  templateUrl: './range-date.component.html',
  styleUrls: ['./range-date.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT },
  ],
})
export default class RangeDateComponent implements OnInit {
  constructor(
    public rangeDateService: RangeDateService,
  ) {}

  ngOnInit(): void {
    this.rangeDateService.formateDate$.subscribe((formatDate) => {
      MY_FORMAT.display.dateInput = formatDate;
    });
  }

  setMonthAndYear(normalizedMonthAndYear: Moment) {
    const ctrlValue = this.rangeDateService.form.get('date')?.value;
    ctrlValue?.month(normalizedMonthAndYear.month());
    ctrlValue?.year(normalizedMonthAndYear.year());
    this.rangeDateService.form.get('date')?.setValue(ctrlValue as Moment);
  }
}
