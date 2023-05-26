import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import AirportsService from '@shared/services/airports.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import PasswordValidators from '../../Validators/password.validator';
import StatisticsService from '../../services/statistics.service';
import DateValidator from '../../Validators/dateValidator';
import AgreementValidator from '../../Validators/agreement.validator';
import TextValidator from '../../Validators/text.validator';
import AuthService from '../../services/auth.service';
import { User } from '@shared/model/persons.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export default class RegistrationComponent implements OnInit {
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
      Validators.pattern(/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g),
    ]),
    citizenship: new FormControl('', [
      Validators.required,
    ]),
    agreement: new FormControl('', [
      Validators.required,
      AgreementValidator.validityAgreement,
    ]),
  });

  constructor(
    public statisticsService: StatisticsService,
    private authService: AuthService,
    private dialogRef: DialogRef,
    public airportsService: AirportsService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.authService.errorMessage$.subscribe((message) => !message || this.snackBar.open(message, '', { duration: 2500 }));
    this.authService.isLogged$.subscribe((isLogged) => !isLogged || this.dialogRef.close());
  }

  public onUpdateStatistics() {
    this.statisticsService.reliableStatistics(this.form);
  }

  public submit() {
    if (this.form.valid) {
      const { countryCode, phone } = this.form.value;
      const newUser: User = { ...this.form.value, phone: { code: countryCode, number: phone } };
      this.authService.register(newUser);
    }
  }
}
