import { Component } from '@angular/core';
import { Flight } from '../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
  selected: Flight[] = [];

  setSelected(selection: Flight[]) {
    this.selected = selection;
  }
}
