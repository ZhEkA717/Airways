import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { selectCart } from 'src/app/redux/selectors/cart.selector';
import { Subscription } from 'rxjs';
import { CartItem } from '../../shared/model/cart.model';
import { updateCart } from '../../redux/actions/cart.action';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  selected: CartItem[] = [];

  private cartItems$ = this.store.select(selectCart);

  private cartItems!: CartItem[];

  private subCartItems!: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    this.subCartItems?.unsubscribe();
  }

  setSelected(selection: CartItem[]) {
    this.selected = selection;
  }

  pay() {
    let { cartItems } = this;

    this.selected.forEach((item) => {
      cartItems = this.cartService.payCartItem(cartItems, item.id);
    });
    this.store.dispatch(updateCart({ cartItems }));
    this.router.navigate(['/account']);
  }
}
