import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { send } from 'src/app/redux/actions/search.action';
import AutocompleteService from 'src/app/shared/services/autocomplete.service';
import RangeDateService from 'src/app/shared/services/range-date.service';
import SelectsService from 'src/app/shared/services/selects.service';
import { FlightSearch } from '../model/flight-search.model';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
})
export default class FlightFormComponent {
  tripWay: 'round' | 'one' = 'round';

  constructor(
    public selectService: SelectsService,
    public rangeDateService: RangeDateService,
    public autocompleteService: AutocompleteService,
    private store: Store,
  ) {}

  hideDarkSpace() {
    this.selectService.touched();
    this.selectService.isChoiceInput = false;
    this.selectService.updatePlaceholder();
  }

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
        .get('startDate')?.value).toDate(),
      endDate: moment(this.rangeDateService.form
        .get('endDate')?.value).toDate(),
      passengers,
    };
    this.store.dispatch(send(search));
  }
}
