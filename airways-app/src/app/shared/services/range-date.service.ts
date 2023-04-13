import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class RangeDateService {
  private defaultFormateDate = 'MM/DD/YYYY';

  private formateDate = new BehaviorSubject<string>(this.defaultFormateDate);

  public formateDate$ = this.formateDate.asObservable();

  public setFormateDate(newFormateDate: string) {
    this.formateDate.next(newFormateDate);
  }

  public form = new FormGroup({
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
    date: new FormControl(moment(), Validators.required),
  });
}
