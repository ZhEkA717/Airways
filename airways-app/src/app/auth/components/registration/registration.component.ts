import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import PasswordValidators from '../../Validators/password.validator';
import StatisticsService from '../../services/statistics.service';
import DateValidator from '../../Validators/dateValidator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export default class RegistrationComponent {
  public isHidePassword = false;

  public bufferValue = 75;

  public codes = [
    { country: 'Abkhazia', code: '895' },
    { country: 'Australia', code: '036' },
    { country: 'Austria', code: '040' },
  ];

  public citizenship = [
    'Abkhazia',
    'Australia',
    'Austria',
  ];

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
    firstName: new FormControl('', [
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.required,
    ]),
    date: new FormControl('', [
      Validators.required,
      DateValidator.validityDate,
    ]),
    gender: new FormControl('', [
      Validators.required,
    ]),
    countryCode: new FormControl('375', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
    ]),
    citizenship: new FormControl('', [
      Validators.required,
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
