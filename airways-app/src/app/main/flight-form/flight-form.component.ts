import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { send } from 'src/app/redux/actions/search.action';
import AutocompleteService from 'src/app/shared/services/autocomplete.service';
import RangeDateService from 'src/app/shared/services/range-date.service';
import SelectsService from 'src/app/shared/services/selects.service';
import { Router } from '@angular/router';
import { FlightSearch, TripWay } from '../model/flight-search.model';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
})
export default class FlightFormComponent {
  tripWay: TripWay = 'round';

  constructor(
    public selectService: SelectsService,
    public rangeDateService: RangeDateService,
    public autocompleteService: AutocompleteService,
    private router: Router,
    private store: Store,
  ) { }

  submit() {
    const passengers = JSON.parse(
      JSON.stringify(this.selectService.passengers),
    );
    const search = <FlightSearch>{
      tripWay: this.tripWay,
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
    this.router.navigate(['booking']);
  }
}
