import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import AuthService from '../../services/auth.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export default class AuthDialogComponent {
  public toggle: 'log in' | 'sign up' = 'log in';

  constructor(public dialogRef: DialogRef, private authService: AuthService) {}

  public socialNetLogin(source: 'google' | 'facebook') {
    const socialOptions = {
      google: { email: 'sundarpichai@google.com', password: '7heB3@$t' },
      facebook: { email: 'markzuckerberg@fb.com', password: 'M3t@ver$e' },
    };
    this.authService.login(socialOptions[source].email, socialOptions[source].password);
    this.dialogRef.close();
  }
}
