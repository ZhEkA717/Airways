import { Component } from '@angular/core';
import PromoDiscountService from '../../services/promo-discount.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
})

export class PromoComponent {
  public value!: string;

  constructor(private promoDiscountService: PromoDiscountService) {}

  onApply() {
    this.promoDiscountService.setPromoCode(this.value);
  }
}
