import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/persons.model';
import AuthService from '../../auth/services/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  public user: User;

  constructor(private authService: AuthService) {
    this.user = {
      email: '',
      firstName: '',
      lastName: '',
      phone: { code: '', number: '' },
      birthDate: '',
      gender: 'Female',
    };
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => { this.user = user; });
  }
}
