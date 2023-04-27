import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export default class AuthDialogComponent {
  public toggle: 'log in' | 'sign up' = 'log in';
}
