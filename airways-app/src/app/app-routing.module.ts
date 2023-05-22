import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((mainPage) => mainPage.default),
    title: 'AIRWAYS | Main',
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then((bookingPage) => bookingPage.default),
    title: 'AIRWAYS | Booking',
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((cartPage) => cartPage.default),
    canActivate: [AuthGuard],
    title: 'AIRWAYS | Cart',
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then((accountPage) => accountPage.default),
    canActivate: [AuthGuard],
    title: 'account',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule { }
