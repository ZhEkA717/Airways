import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CartRoutingModule } from './cart-routing.module';
import { CartPageComponent } from './cart-page/cart-page.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [CartPageComponent, TableComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [
  ],
})
export default class CartModule { }
