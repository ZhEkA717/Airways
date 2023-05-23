import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import AccountPageResolver from './account-page.resolver';

const routes: Routes = [
  {
    path: '',
    component: AccountPageComponent,
    resolve: {
      currentUser: AccountPageResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
