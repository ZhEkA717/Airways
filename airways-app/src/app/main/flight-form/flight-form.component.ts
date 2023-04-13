import { Component } from '@angular/core';
import AutocompleteService from 'src/app/shared/services/autocomplete.service';
import RangeDateService from 'src/app/shared/services/range-date.service';
import SelectsService from 'src/app/shared/services/selects.service';

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
  ) {}

  hideDarkSpace(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    if (el.classList.contains('dark-background')) {
      this.selectService.isChoiceInput = false;
    }
  }
}
