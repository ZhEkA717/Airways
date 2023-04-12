import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class SelectsService {
  private defaultFormateDate = 'MM/DD/YYYY';

  private formateDate = new BehaviorSubject<string>(this.defaultFormateDate);

  public formateDate$ = this.formateDate.asObservable();

  public setFormateDate(newFormateDate: string) {
    this.formateDate.next(newFormateDate);
  }
}
