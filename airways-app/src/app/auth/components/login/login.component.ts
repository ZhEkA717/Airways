import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import PasswordValidators from '../../Validators/password.validator';
import StatisticsService from '../../services/statistics.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  public isHidePassword = false;

  public bufferValue = 75;

  public form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      PasswordValidators.lengthPassword,
      PasswordValidators.mixtureLowerAndUpperLetter,
      PasswordValidators.mixtureLettersAndNumbers,
      PasswordValidators.specialSymbols,
    ]),
  });

  constructor(public statisticsService: StatisticsService) {}

  public onUpdateStatistics() {
    this.statisticsService.reliableStatistics(this.form);
  }

  public submit() {
    // eslint-disable-next-line no-useless-return
    if (this.form.invalid) return;
  }
}
