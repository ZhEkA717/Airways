import { FormControl } from '@angular/forms';

export default class AgreementValidator {
  static validityAgreement(control: FormControl): { [key: string]: boolean } | null {
    return control.value ? null : { validityAgreement: true };
  }
}
