import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  @Input() birthDate = '01.20.1990';

  @Input() address = 'New Vasyuki, Ohio';

  @Input() email = 'elonmusk@tesla.com';

  @Input() phone = '+7 928 742 42 00';
}
