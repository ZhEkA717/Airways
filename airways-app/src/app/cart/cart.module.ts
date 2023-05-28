import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import SharedModule from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartPageComponent } from './cart-page/cart-page.component';
import { TableComponent } from './components/table/table.component';
import { PromoComponent } from './components/promo/promo.component';

@NgModule({
  declarations: [CartPageComponent, TableComponent, PromoComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
  ],
  exports: [
  ],
})
export default class CartModule { }
