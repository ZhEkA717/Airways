import { Component, Input, OnInit } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import AutocompleteService from '../../services/autocomplete.service';
import AirportsService from '../../services/airports.service';
import { Airport } from '../../model/airport.model';

@Component({
  selector: 'app-autocomplete-group',
  templateUrl: './autocomplete-group.component.html',
  styleUrls: ['./autocomplete-group.component.scss'],
})
export default class AutocompleteGroupComponent implements OnInit {
  @Input() directionVisibility!: boolean;

  public filteredOptionsFrom!: Observable<Airport[]>;

  public filteredOptionsDestination!: Observable<Airport[]>;

  constructor(
    public autocompleteService: AutocompleteService,
    public airportsService: AirportsService,
  ) {}

  ngOnInit(): void {
    this.filteredOptionsFrom = this
      .getFilteredOption(this.autocompleteService.form.get('from'));
    this.filteredOptionsDestination = this
      .getFilteredOption(this.autocompleteService.form.get('destination'));
  }

  private getFilteredOption(control: AbstractControl | null) {
    return control?.valueChanges.pipe(
      startWith(''),
      map((value) => this.airportsService.filter(value || '')),
    ) as Observable<Airport[]>;
  }
}
