import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import RangeDateService from 'src/app/shared/services/range-date.service';
import SelectsService from 'src/app/shared/services/selects.service';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
})
export default class FlightFormComponent {
  public form = new FormGroup({
    from: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    ratio: new FormControl('round'),
  });

  public options: string[] = ['One', 'Two', 'Three'];

  constructor(
    public selectService: SelectsService,
    public rangeDateService: RangeDateService,
  ) {}

  onChangeDirection() {
    const fromValue = this.form.get('from')?.value;
    const destinationValue = this.form.get('destination')?.value;
    this.form.get('from')?.setValue(destinationValue as string);
    this.form.get('destination')?.setValue(fromValue as string);
  }
}
