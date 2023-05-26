import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '@shared/model/persons.model';
import { ActivatedRoute } from '@angular/router';
import AuthService from '@auth/services/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent {
  public user$!: Observable<User>;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.user$ = this.route.data.pipe(
      map((data) => data?.['currentUser']),
    );
  }
}
