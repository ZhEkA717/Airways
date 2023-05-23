import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import CurrentUserResolver from './current-user.resolver';

const routes: Routes = [
  {
    path: '',
    component: AccountPageComponent,
    resolve: {
      currentUser: CurrentUserResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
