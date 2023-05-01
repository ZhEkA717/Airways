import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import PasswordValidators from '../../Validators/password.validator';
import StatisticsService from '../../services/statistics.service';
import AuthService from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  public isHidePassword = true;

  public bufferValue = 75;

  public form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      PasswordValidators.lengthPassword,
      PasswordValidators.mixtureLowerAndUpperLetter,
      PasswordValidators.mixtureLettersAndNumbers,
      PasswordValidators.specialSymbols,
    ]),
  });

  constructor(
    public statisticsService: StatisticsService,
    private authService: AuthService,
    private dialogRef: DialogRef,
    private snackBar: MatSnackBar,
  ) {}

  public onUpdateStatistics() {
    this.statisticsService.reliableStatistics(this.form);
  }

  public submit() {
    this.authService.isLogged$.subscribe((isLogged) => !isLogged || this.dialogRef.close());
    this.authService.errorMessage$.subscribe((message) => !message || this.snackBar.open(message, '', { duration: 3000 }));

    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login(email, password);
    }
  }
}
