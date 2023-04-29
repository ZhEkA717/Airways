import { FormControl } from '@angular/forms';

export default class DateValidator {
  static validityDate(control: FormControl): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const inputDate = new Date(control.value);
    return (inputDate > currentDate) ? { validityDate: true } : null;
  }
}
