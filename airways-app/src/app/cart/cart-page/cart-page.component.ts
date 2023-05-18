import { Component } from '@angular/core';
import { CartItem } from '../../shared/model/cart.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
  selected: CartItem[] = [];

  setSelected(selection: CartItem[]) {
    this.selected = selection;
  }
}
