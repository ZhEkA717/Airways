import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import PasswordValidators from '../../Validators/password.validator';
import StatisticsService from '../../services/statistics.service';
import DateValidator from '../../Validators/dateValidator';
import AgreementValidator from '../../Validators/agreement.validator';
import TextValidator from '../../Validators/text.validator';

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
      TextValidator.validityText,
    ]),
    lastName: new FormControl('', [
      Validators.required,
      TextValidator.validityText,
    ]),
    date: new FormControl('', [
      Validators.required,
      DateValidator.validityDate,
    ]),
    gender: new FormControl('', [
      Validators.required,
    ]),
    countryCode: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
    ]),
    citizenship: new FormControl('', [
      Validators.required,
    ]),
    agreement: new FormControl('', [
      Validators.required,
      AgreementValidator.validityAgreement,
    ]),
  });

  constructor(public statisticsService: StatisticsService) {}

  phoneFormat(input: string) {
    return input.replace(
      /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
      '$1-$2-$3-$4-$5',
    );
  }

  public onUpdateStatistics() {
    this.statisticsService.reliableStatistics(this.form);
  }

  public submit() {
    // eslint-disable-next-line no-useless-return
    if (this.form.invalid) return;
  }
}
