import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import HttpApiService from 'src/app/core/services/http-api.service';
import { Subscription } from 'rxjs';
import PasswordValidators from '../../Validators/password.validator';
import StatisticsService from '../../services/statistics.service';
import DateValidator from '../../Validators/dateValidator';
import AgreementValidator from '../../Validators/agreement.validator';
import TextValidator from '../../Validators/text.validator';
import AuthService from '../../services/auth.service';
import { User } from '../../../shared/model/persons.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export default class RegistrationComponent implements OnInit, OnDestroy {
  public isHidePassword = false;

  public bufferValue = 75;

  public codes!: {
    country: string,
    phoneCode: string,
  }[];

  public citizenship!: string[];

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

  private subAirport!: Subscription;

  constructor(
    public statisticsService: StatisticsService,
    private httpApiService: HttpApiService,
    private authService: AuthService,
    private dialogRef: DialogRef,
  ) {}

  ngOnInit(): void {
    this.subAirport = this.httpApiService.getAirports().subscribe((airports) => {
      this.codes = airports.map((item) => ({
        country: item.country,
        phoneCode: item.phoneCode,
      }));
      this.citizenship = airports.map((item) => item.country);
    });
  }

  ngOnDestroy(): void {
    this.subAirport.unsubscribe();
  }

  public onUpdateStatistics() {
    this.statisticsService.reliableStatistics(this.form);
  }

  public submit() {
    if (!this.form.invalid) {
      const {
        email,
        password,
        firstName,
        lastName,
        date,
        gender,
        countryCode,
        phone,
      } = this.form.value;
      const newUser: User = {
        email,
        password,
        firstName,
        lastName,
        birthDate: date,
        gender,
        phone: { code: countryCode, number: phone },
      };
      this.authService.register(newUser);
      this.authService.isLogged$.subscribe((isLogged) => (isLogged ?? this.dialogRef.close()));
    }
  }
}
