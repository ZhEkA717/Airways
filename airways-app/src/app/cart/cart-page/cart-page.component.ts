import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CartItem } from '@shared/model/cart.model';
import { payCartItem } from '@redux/actions/cart.action';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
  selected: CartItem[] = [];

  constructor(private store: Store, private router: Router) { }

  setSelected(selection: CartItem[]) {
    this.selected = selection;
  }

  pay() {
    this.selected.forEach((item) => {
      this.store.dispatch(payCartItem({ id: item.id }));
    });
    this.router.navigate(['/account']);
  }
}
