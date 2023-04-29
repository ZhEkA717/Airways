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
  });

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
      ]),
      lastName: new FormControl('', [
        Validators.required,
      ]),
      gender: new FormControl('', [
        Validators.required,
      ]),
      date: new FormControl('', [
        Validators.required,
      ]),
      isCripple: new FormControl(''),
    });
  }

  toFligth() {
    this.router.navigate(['/booking/flight']);
  }

  submit() {
    const form = this.passengers.value
      .map((item: Passenger, i: number) => ({
        ...item,
        type: this.passengersName[i],
      }));

    // eslint-disable-next-line no-console
    console.log(form);
    if (this.form.valid) {
      this.router.navigate(['/booking/review']);
    }
  }
}
