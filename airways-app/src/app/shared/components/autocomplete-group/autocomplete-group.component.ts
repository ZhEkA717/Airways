import { Component, Input } from '@angular/core';
import AutocompleteService from '../../services/autocomplete.service';
import AirportsService from '../../services/airports.service';

@Component({
  selector: 'app-autocomplete-group',
  templateUrl: './autocomplete-group.component.html',
  styleUrls: ['./autocomplete-group.component.scss'],
})
export default class AutocompleteGroupComponent {
  @Input() directionVisibility!: boolean;

  constructor(
    public autocompleteService: AutocompleteService,
    public airportsService: AirportsService,
  ) {}
}
