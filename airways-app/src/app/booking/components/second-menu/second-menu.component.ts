import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import HeaderService from 'src/app/core/services/header.service';
import { FlightSearch } from 'src/app/main/model/flight-search.model';
import { send } from 'src/app/redux/actions/search.action';
import { selectSearch } from 'src/app/redux/selectors/search.selector';
import AutocompleteService from 'src/app/shared/services/autocomplete.service';
import RangeDateService from 'src/app/shared/services/range-date.service';
import SelectsService from 'src/app/shared/services/selects.service';

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
  }
}
