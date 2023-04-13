import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export default class AutocompleteService {
  public form = new FormGroup({
    from: new FormControl('', [
      Validators.required,
    ]),
    destination: new FormControl('', [
      Validators.required,
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
