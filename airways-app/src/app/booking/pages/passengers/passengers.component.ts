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
import DateValidator from '@auth/Validators/dateValidator';
import TextValidator from '@auth/Validators/text.validator';
import HeaderService from '@core/services/header.service';
import { FlightSearch, TripWay } from 'src/app/main/model/flight-search.model';
import { send } from '@redux/actions/passengers.action';
import { selectSearch, selectTripWay } from '@redux/selectors/search.selector';
import { selectDateFormat, selectMoneyFormat } from '@redux/selectors/settings.selector';
import AirportsService from '@shared/services/airports.service';
import { selectPassengerForm } from '@redux/selectors/passengers.selector';
import { backSeats, thereSeats } from '@redux/actions/flight.action';
import { selectBackTrip, selectThereTrip } from '@redux/selectors/flight.selector';
import ReserveSeatService from '../../services/reserve-seat.service';
import { Baggage, PassengersForm, PassengersInfo } from '../../models/passengers.model';

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

  private moneyFormat$ = this.store.select(selectMoneyFormat);

  private dateFormat$!: Observable<string>;

  private subSearchForm!: Subscription;

  private subDate!: Subscription;

  private subMoneyFormat!: Subscription;

  private subSeatsThere!: Subscription;

  private subSeatsBack!: Subscription;

  public passengersName: string[] = [];

  public passengersWithoutInfant: string[] = [];

  public id!: number | null;

  public isTitleFirstName = false;

  public isTitleLastName = false;

  public moneyFormat!: string;

  public seatsThere: string[] = [];

  public seatsBack: string[] = [];

  public form = new FormGroup({
    passengers: new FormArray([]),
    countryCode: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });

  public flightThere$ = this.store.select(selectThereTrip);

  public flightBack$ = this.store.select(selectBackTrip);

  private tripWay$ = this.store.select(selectTripWay);

  public tripWay!: TripWay;

  private subTripWay!: Subscription;

  constructor(
    private headerService: HeaderService,
    private store: Store,
    private router: Router,
    public location: Location,
    public airportsService: AirportsService,
    public reserveSeatService: ReserveSeatService,
  ) {}

  ngOnInit(): void {
    this.headerService.setStepper({
      flight: true,
      passengers: true,
      review: false,
    });

    this.subTripWay = this.tripWay$.subscribe((way) => {
      this.tripWay = way;
    });

    this.subSearchForm = this.searchForm$.subscribe((res) => {
      this.fillPassengersName(res);
      this.passengersWithoutInfant = this.passengersName
        .filter((item) => item !== 'Infant');
    });

    this.fillPassengersFormGroup();

    this.dateFormat$ = this.store.select(selectDateFormat);
    this.subDate = this.dateFormat$.subscribe((formatDate) => {
      MY_FORMAT.display.dateInput = formatDate;
      this.passengers.controls.forEach((item) => {
        this.changeFormat(item);
      });
    });

    this.subMoneyFormat = this.moneyFormat$.subscribe((moneyFormat) => {
      this.moneyFormat = moneyFormat;
    });

    this.subSeatsThere = this.reserveSeatService.reservedSeatsThere$
      .subscribe((seats) => {
        this.seatsThere = seats;
        this.store.dispatch(thereSeats({ thereSeats: seats }));
      });

    this.subSeatsBack = this.reserveSeatService.reservedSeatsBack$
      .subscribe((seats) => {
        this.seatsBack = seats;
        this.store.dispatch(backSeats({ backSeats: seats }));
      });

    this.store.select(selectPassengerForm).subscribe((form) => {
      this.form?.get('phone')?.setValue(form.phone);
      this.form?.get('countryCode')?.setValue(form.countryCode);
      this.form?.get('email')?.setValue(form.email);

      form.passengers?.forEach((item, i) => {
        this.passengers?.controls[i]?.get('firstName')?.setValue(item.firstName);
        this.passengers?.controls[i]?.get('lastName')?.setValue(item.lastName);
        this.passengers?.controls[i]?.get('gender')?.setValue(item.gender);
        this.passengers?.controls[i]?.get('isCripple')?.setValue(item.isCripple);
        this.passengers?.controls[i]?.get('date')?.setValue(item.date);
        this.passengers?.controls[i]?.get('baggage')?.setValue(item.baggage.type);
      });
    });
  }

  ngOnDestroy(): void {
    this.subSearchForm.unsubscribe();
    this.subDate.unsubscribe();
    this.subMoneyFormat.unsubscribe();
    this.subSeatsThere?.unsubscribe();
    this.subSeatsBack?.unsubscribe();
    this.subTripWay?.unsubscribe();
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
    this.router.navigate(['@booking/flight'], {
      queryParams: {
        isNavigatePassenger: true,
      },
    });
  }

  toReview() {
    this.router.navigate(['@booking/review']);
  }

  public getBaggage(type: string): Baggage {
    let baggage: Baggage = <Baggage>{};

    switch (type) {
      case 'baggage': baggage = {
        type,
        text: 'checked baggage',
        weight: 30,
        size: '158 x 158 x 158',
        price: 15,
      };
        break;
      case 'hand+': baggage = {
        type,
        text: 'hand luggage +',
        weight: 10,
        size: '56 x 45 x 20',
        price: 10,
      };
        break;
      case 'hand': baggage = {
        type,
        text: 'hand luggage',
        weight: 5,
        size: '56 x 45 x 20',
        price: 0,
      };
        break;
      default: <Baggage>{};
    }
    return baggage;
  }

  submit() {
    const passengers = this.passengers.value
      .map((item: PassengersInfo, i: number) => ({
        ...item,
        type: this.passengersName[i],
        baggage: this.getBaggage(this.passengers.value[i].baggage),
      }));

    const form = {
      ...this.form.value,
      passengers,
    };

    this.store.dispatch(send(form as PassengersForm));

    // this.store.dispatch(thereSeats({ thereSeats: this.seatsThere }));
    // this.store.dispatch(backSeats({ backSeats: this.seatsBack }));

    if (this.form.valid) {
      this.toReview();
    }
  }
}
