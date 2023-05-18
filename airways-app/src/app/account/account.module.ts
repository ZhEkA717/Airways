import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountPageComponent } from './account-page/account-page.component';

@NgModule({
  declarations: [
    AccountPageComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
  ],
})
export default class AccountModule { }
