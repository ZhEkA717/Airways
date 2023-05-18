import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((mainPage) => mainPage.default),
    title: 'main',
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then((bookingPage) => bookingPage.default),
    title: 'booking',
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((cartPage) => cartPage.default),
    title: 'cart',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule { }
