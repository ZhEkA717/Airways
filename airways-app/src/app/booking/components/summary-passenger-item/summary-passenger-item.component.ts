import { Component, Input } from '@angular/core';
import { PassengersInfo } from '../../models/passengers.model';

@Component({
  selector: 'app-summary-passenger-item',
  templateUrl: './summary-passenger-item.component.html',
  styleUrls: ['./summary-passenger-item.component.scss'],
})
export default class SummaryPassengerItemComponent {
  @Input() passenger!: PassengersInfo;
}
