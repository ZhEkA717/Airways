import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class PromoDiscountService {
  public PROMO_CODE = ['Airways'];

  public DISCOUNT = 0.1;

  private promoCode = new BehaviorSubject<string>('');

  public promoCode$ = this.promoCode.asObservable();

  public setPromoCode(code: string) {
    this.promoCode.next(code);
  }
}
