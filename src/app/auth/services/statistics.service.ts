import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import LoginService from './login.service';

@Injectable()
export default class StatisticsService {
  public valueReliable = 0;

  public text = 'Сome up with a password';

  private reliablePassword = {
    0: 'Сome up with a password',
    10: 'Very weak password',
    20: 'Weak password',
    30: 'Average password',
    40: 'Strong password',
    50: 'Reliable password',
  };

  constructor(
    private loginService: LoginService,
  ) {}

  public reliableStatistics(form: FormGroup) {
    const errors = form.get('password')?.errors;
    const statistics = [
      !errors?.['required'],
      !errors?.['lengthPassword'],
      !errors?.['mixtureLowerAndUpperLetter'],
      !errors?.['mixtureLettersAndNumbers'],
      !errors?.['specialSymbols'],
    ];
    this.valueReliable = (statistics.filter((item) => item).length * 50) / 5;
    this.text = this.reliablePassword[this.valueReliable as keyof typeof this.reliablePassword];
    this.loginService.setValueReliable(this.valueReliable);
  }
}
