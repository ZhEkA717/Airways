import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import RangeDateService from 'src/app/shared/services/range-date.service';
import SelectsService from 'src/app/shared/services/selects.service';

const moment = _moment;

export const MY_FORMAT = {
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
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT },
  ],
})
export default class FlightFormComponent implements OnInit {
  public form = new FormGroup({
    from: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
    date: new FormControl(moment(), Validators.required),
    ratio: new FormControl('round'),
  });

  public options: string[] = ['One', 'Two', 'Three'];

  constructor(
    public rangeDateService: RangeDateService,
    public selectService: SelectsService,
  ) {}

  ngOnInit(): void {
    this.rangeDateService.formateDate$.subscribe((formatDate) => {
      MY_FORMAT.display.dateInput = formatDate;
    });
  }

  onChangeDirection() {
    const fromValue = this.form.get('from')?.value;
    const destinationValue = this.form.get('destination')?.value;
    this.form.get('from')?.setValue(destinationValue as string);
    this.form.get('destination')?.setValue(fromValue as string);
  }

  setMonthAndYear(normalizedMonthAndYear: Moment) {
    const ctrlValue = this.form.get('date')?.value;
    ctrlValue?.month(normalizedMonthAndYear.month());
    ctrlValue?.year(normalizedMonthAndYear.year());
    this.form.get('date')?.setValue(ctrlValue as Moment);
  }
}
