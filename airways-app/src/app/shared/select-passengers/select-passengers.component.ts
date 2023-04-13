import { Component } from '@angular/core';
import SelectsService from '../services/selects.service';

@Component({
  selector: 'app-select-passengers',
  templateUrl: './select-passengers.component.html',
  styleUrls: ['./select-passengers.component.scss'],
})
export default class SelectPassengersComponent {
  constructor(public selectService: SelectsService) {}
}
