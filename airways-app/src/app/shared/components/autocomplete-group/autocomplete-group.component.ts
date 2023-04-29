import { Component, Input, OnInit } from '@angular/core';
import HttpApiService from 'src/app/core/services/http-api.service';
import AutocompleteService from '../../services/autocomplete.service';
import { Airport } from '../../model/airport.model';

@Component({
  selector: 'app-autocomplete-group',
  templateUrl: './autocomplete-group.component.html',
  styleUrls: ['./autocomplete-group.component.scss'],
})
export default class AutocompleteGroupComponent implements OnInit {
  @Input() directionVisibility!: boolean;

  public options: Airport[] = [];

  constructor(
    public autocompleteService: AutocompleteService,
    private httpApiService: HttpApiService,
  ) {}

  ngOnInit(): void {
    this.httpApiService.getAirports().subscribe((res) => {
      this.options = res;
    });
  }
}
