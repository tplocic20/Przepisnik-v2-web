import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('pw').value; // to get value in input tag
    const confirmPassword = AC.get('confirm').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('confirm').setErrors( {MatchPassword: true} );
    } else {
      return null;
    }
  }
}
