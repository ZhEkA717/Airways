import { FormControl } from '@angular/forms';

export default class StartDateValidator {
  static validityDate(control: FormControl): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const date = `
      ${currentDate.getFullYear()}/
      ${currentDate.getMonth() + 1}/
      ${currentDate.getDate()}
    `;
    currentDate.setDate(currentDate.getDate());
    const inputDate = new Date(control.value?._d);
    const now = new Date(date);
    if (inputDate < now) {
      return { validityDate: true };
    }
    return null;
  }
}
