import { Component } from '@angular/core';
import SelectsService from '@shared/services/selects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent {
  title = 'airways-app';

  constructor(public selectService: SelectsService) {}

  hideDarkSpace() {
    this.selectService.touched();
    this.selectService.isChoiceInput = false;
    this.selectService.updatePlaceholder();
  }
}
