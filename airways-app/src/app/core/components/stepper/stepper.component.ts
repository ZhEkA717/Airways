import { Component } from '@angular/core';
import HeaderService from '../../services/header.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export default class StepperComponent {
  constructor(public headerService: HeaderService) {}
}
