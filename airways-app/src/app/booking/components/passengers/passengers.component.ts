import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import DateValidator from 'src/app/auth/Validators/dateValidator';
import TextValidator from 'src/app/auth/Validators/text.validator';
import HeaderService from 'src/app/core/services/header.service';
import { FlightSearch } from 'src/app/main/model/flight-search.model';
import { selectSearch } from 'src/app/redux/selectors/search.selector';
import { Passenger } from 'src/app/shared/model/persons.model';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
})
export default class PassengersComponent implements OnInit, OnDestroy {
  private searchForm$ = this.store.select(selectSearch);

  private subSearchForm!: Subscription;

  public passengersName: string[] = [];

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

  public citizenship = [
    'Abkhazia',
    'Australia',
    'Austria',
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
  }

  ngOnDestroy(): void {
    this.subSearchForm.unsubscribe();
  }

  get passengers() {
    return this.form.get('passengers') as FormArray;
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
      date: new FormControl('', [
        Validators.required,
        DateValidator.validityDate,
      ]),
      isCripple: new FormControl(''),
    });
  }

  toFlight() {
    this.router.navigate(['/booking/flight']);
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

    // eslint-disable-next-line no-console
    console.log(form);

    if (this.form.valid) {
      this.router.navigate(['/booking/review']);
    }
  }
}
