import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type AlertType = 'success' | 'warning' | 'error';

export interface Alert {
  type: AlertType,
  text: string
}

@Injectable({
  providedIn: 'root',
})
export default class AlertService {
  public alert$ = new Subject<Alert>();

  public success(text: string) {
    this.alert$.next({ type: 'success', text });
  }

  public warning(text: string) {
    this.alert$.next({ type: 'warning', text });
  }

  public error(text: string) {
    this.alert$.next({ type: 'error', text });
  }
}
