import { Component, Input } from '@angular/core';
import { PassengersInfo } from '../../models/passengers.model';
import ConvertMoneyService from '../../services/convert-money.service';

@Component({
  selector: 'app-summary-passenger-item',
  templateUrl: './summary-passenger-item.component.html',
  styleUrls: ['./summary-passenger-item.component.scss'],
})
export default class SummaryPassengerItemComponent {
  @Input() passenger!: PassengersInfo;

  constructor(
    public convertMoneyService: ConvertMoneyService,
  ) {}
}
