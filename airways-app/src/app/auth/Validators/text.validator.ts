import { FormControl } from '@angular/forms';

export default class TextValidator {
  static validityText(control: FormControl): { [key: string]: boolean } | null {
    let res = null;
    Array.from(control.value).forEach((item) => {
      if (Number(item)) res = { validityText: true };
    });
    return res;
  }
}
