import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class LoginService {
  private defaultValueReliable = 0;

  private valueReliable = new BehaviorSubject<number>(this.defaultValueReliable);

  public valueReliable$ = this.valueReliable.asObservable();

  public setValueReliable(newValue: number) {
    this.valueReliable.next(newValue);
  }
}
