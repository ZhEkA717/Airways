import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import DateValidator from 'src/app/auth/Validators/dateValidator';
import TextValidator from 'src/app/auth/Validators/text.validator';
import HeaderService from 'src/app/core/services/header.service';
import { FlightSearch } from 'src/app/main/model/flight-search.model';
import { send } from 'src/app/redux/actions/passengers.action';
import { selectSearch } from 'src/app/redux/selectors/search.selector';
import { selectDateFormat } from 'src/app/redux/selectors/settings.selector';
import { Passenger } from 'src/app/shared/model/persons.model';
import { PassengersForm } from '../../models/passengers.model';

export const MY_FORMAT = {
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
  },
};

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT },
  ],
})
export default class PassengersComponent implements OnInit, OnDestroy {
  private searchForm$ = this.store.select(selectSearch);

  private subSearchForm!: Subscription;

  public passengersName: string[] = [];

  public id!: number | null;

  public isTitleFirstName = false;

  public isTitleLastName = false;

  public dateFormat$!: Observable<string>;

  private subDate!: Subscription;

  public form = new FormGroup({
    passengers: new FormArray([]),
    countryCode: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });

  public codes = [
    { country: 'Abkhazia', code: '895' },
    { country: 'Australia', code: '036' },
    { country: 'Austria', code: '040' },
  ];

  constructor(
    private headerService: HeaderService,
    private store: Store,
    private router: Router,
    public location: Location,
  ) {}

  ngOnInit(): void {
    this.headerService.setStepper({
      flight: true,
      passengers: true,
      review: false,
    });

    this.subSearchForm = this.searchForm$.subscribe((res) => {
      this.fillPassengersName(res);
    });

    this.fillPassengersFormGroup();

    this.dateFormat$ = this.store.select(selectDateFormat);
    this.subDate = this.dateFormat$.subscribe((formatDate) => {
      MY_FORMAT.display.dateInput = formatDate;
      this.passengers.controls.forEach((item) => {
        this.changeFormat(item);
      });
    });
  }

  ngOnDestroy(): void {
    this.subSearchForm.unsubscribe();
    this.subDate.unsubscribe();
  }

  get passengers() {
    return this.form.get('passengers') as FormArray;
  }

  private changeFormat(passenger: AbstractControl) {
    const date = passenger.get('date')?.value;
    if (date) passenger.get('date')?.setValue(date);
  }

  private fillPassengersName(search: FlightSearch) {
    search.passengers.forEach((item) => {
      for (let i = 0; i < item.value; i += 1) {
        this.passengersName.push(item.view);
      }
    });
  }

  private fillPassengersFormGroup() {
    this.passengersName.forEach(() => {
      this.passengers.push(this.createPassenger());
    });
  }

  createPassenger() {
    return new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        TextValidator.validityText,
      ]),
      lastName: new FormControl('', [
        Validators.required,
        TextValidator.validityText,
      ]),
      gender: new FormControl('', [
        Validators.required,
      ]),
      baggage: new FormControl('hand', [
        Validators.required,
      ]),
      date: new FormControl('', [
        Validators.required,
        DateValidator.validityDate,
      ]),
      dateFormat: new FormControl(moment()),
      isCripple: new FormControl(''),
    });
  }

  toFlight() {
    this.router.navigate(['/booking/flight']);
  }

  toRewiew() {
    this.router.navigate(['/booking/review']);
  }

  submit() {
    const passengers = this.passengers.value
      .map((item: Passenger, i: number) => ({
        ...item,
        type: this.passengersName[i],
      }));

    const form = {
      ...this.form.value,
      passengers,
    };

    this.store.dispatch(send(form as PassengersForm));

    if (this.form.valid) {
      this.toRewiew();
    }
  }
}
