import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountPageComponent } from './account-page/account-page.component';
import { TableComponent } from './components/table/table.component';
import SharedModule from '../shared/shared.module';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [
    AccountPageComponent,
    TableComponent,
    UserAvatarComponent,
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
  ],
})
export default class AccountModule { }
