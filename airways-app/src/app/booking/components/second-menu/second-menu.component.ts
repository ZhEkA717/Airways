import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import HeaderService from '@core/services/header.service';
import { FlightSearch } from 'src/app/main/model/flight-search.model';
import { send } from '@redux/actions/search.action';
import { selectSearch } from '@redux/selectors/search.selector';
import AutocompleteService from '@shared/services/autocomplete.service';
import RangeDateService from '@shared/services/range-date.service';
import SelectsService from '@shared/services/selects.service';
import { send as sendPassengerForm } from '@redux/actions/passengers.action';
import { resetFlight } from '@redux/actions/flight.action';
import { PassengersForm } from '../../models/passengers.model';
import ReserveSeatService from '../../services/reserve-seat.service';

@Component({
  selector: 'app-second-menu',
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss'],
})
export default class SecondMenuComponent implements OnInit {
  public searchForm!:FlightSearch;

  public tripWay!: boolean;

  public from!: string;

  public destination!: string;

  public count!: number;

  public startDate!: Date;

  public endDate!: Date;

  public isEdit = false;

  constructor(
    public selectService: SelectsService,
    public rangeDateService: RangeDateService,
    public autocompleteService: AutocompleteService,
    public headerService: HeaderService,
    private reserveSeatService: ReserveSeatService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.select(selectSearch).subscribe((search) => {
      this.searchForm = search;
      this.tripWay = search.tripWay === 'one';
      this.from = search.from;
      this.destination = search.destination;
      this.count = search.passengers
        ?.reduce((start, item) => start + item.value, 0);
      this.startDate = new Date(search.startDate);
      this.endDate = new Date(search.endDate);
    });
  }

  submit() {
    const passengers = JSON.parse(
      JSON.stringify(this.selectService.passengers),
    );
    const search = <FlightSearch>{
      ...this.searchForm,
      from: this.autocompleteService.form
        .get('from')?.value,
      destination: this.autocompleteService.form
        .get('destination')?.value,
      startDate: moment(this.rangeDateService.form
        .get('startDate')?.value).toDate().toString(),
      endDate: moment(this.rangeDateService.form
        .get('endDate')?.value).toDate().toString(),
      passengers,
    };
    this.store.dispatch(send(search));
    this.store.dispatch(sendPassengerForm(<PassengersForm>{}));
    this.reserveSeatService.resetReservedSeatsThere();
    this.reserveSeatService.resetReservedSeatsBack();
    this.store.dispatch(resetFlight());
  }
}
