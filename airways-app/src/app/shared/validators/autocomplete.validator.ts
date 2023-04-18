import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default class MatchFieldValidator {
  static validFieldMatch(
    from: string,
    destination: string,
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fromFiled: unknown | null = control.get(from)?.value;
      const destinationFiled: unknown | null = control.get(destination)?.value;

      const errorMessage = 'The directions cannot be the same';
      const requiredFrom = 'Please enter the direction "from"';
      const requiredDestination = 'Please enter a destination direction';

      if (fromFiled === destinationFiled) {
        control.get(destination)?.setErrors({
          equalFields: true,
          errorMessage,
        });
      }
      if (fromFiled === '') {
        control.get(from)?.setErrors({
          required: true,
          requiredFrom,
        });
      }
      if (destinationFiled === '') {
        control.get(destination)?.setErrors({
          required: true,
          requiredDestination,
        });
      }

      return null;
    };
  }
}
