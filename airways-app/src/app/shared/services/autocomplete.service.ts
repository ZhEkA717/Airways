import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import MatchFieldValidator from '../validators/autocomplete.validator';

@Injectable({
  providedIn: 'root',
})
export default class AutocompleteService {
  public form = new FormGroup({
    from: new FormControl(''),
    destination: new FormControl(''),
  }, {
    validators: Validators.compose([
      MatchFieldValidator.validFieldMatch('from', 'destination'),
    ]),
  });

  public options: string[] = ['One', 'Two', 'Three'];

  onChangeDirection() {
    const fromValue = this.form.get('from')?.value;
    const destinationValue = this.form.get('destination')?.value;
    this.form.get('from')?.setValue(destinationValue as string);
    this.form.get('destination')?.setValue(fromValue as string);
  }
}
