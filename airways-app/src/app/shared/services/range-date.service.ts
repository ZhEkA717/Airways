import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import StartDateValidator from '../validators/start-date.validator';

@Injectable({
  providedIn: 'root',
})
export default class RangeDateService {
  public form = new FormGroup({
    startDate: new FormControl(null, [
      Validators.required,
      StartDateValidator.validityDate,
    ]),
    endDate: new FormControl(null, Validators.required),
    date: new FormControl(moment(), Validators.required),
  });

  public changeFormat() {
    const start = this.form.get('startDate')?.value;
    const end = this.form.get('endDate')?.value;
    if (start && end) {
      this.form.get('startDate')?.setValue(start);
      this.form.get('endDate')?.setValue(end);
    }
  }
}
