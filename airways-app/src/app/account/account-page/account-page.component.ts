import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/persons.model';
import AuthService from '../../auth/services/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent {
  public user$!: Observable<User>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.getCurrentUser();
  }
}
