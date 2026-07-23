import { FormControl } from '@angular/forms';

export default class PasswordValidators {
  static lengthPassword(control: FormControl): { [key: string]: boolean } | null {
    if (control.value.length < 8) {
      return { lengthPassword: true };
    }
    return null;
  }

  static mixtureLowerAndUpperLetter(control: FormControl): { [key: string]: boolean } | null {
    if (/([a-z])/.test(control.value)
    && /([A-Z])/.test(control.value)) {
      return null;
    }
    return { mixtureLowerAndUpperLetter: true };
  }

  static mixtureLettersAndNumbers(control: FormControl): { [key: string]: boolean } | null {
    if (/[0-9]/.test(control.value)
      && /([a-z]|[A-Z])/.test(control.value)
    ) {
      return null;
    }
    return { mixtureLettersAndNumbers: true };
  }

  static specialSymbols(control: FormControl): { [key: string]: boolean } | null {
    if (/[!@#\]?]+/.test(control.value)) {
      return null;
    }
    return { specialSymbols: true };
  }
}
