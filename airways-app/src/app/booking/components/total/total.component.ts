import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectBackTrip, selectThereTrip } from 'src/app/redux/selectors/flight.selector';
import { selectPassengers } from 'src/app/redux/selectors/passengers.selector';
import { PassengersInfo } from '../../models/passengers.model';
import ConvertMoneyService from '../../services/convert-money.service';
import TotalService from '../../services/total.service';

const ADULT_RATIO = 0.55;
const CHILD_RATIO = 0.85;
const INFANT_RATIO = 0.12;

const ADULT_RATIO_TYPE = 1;
const CHILD_RATIO_TYPE = 0.97;
const INFANT_RATIO_TYPE = 0.92;

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss'],
})
export default class TotalComponent implements OnInit, OnDestroy {
  private there$ = this.store.select(selectThereTrip);

  private back$ = this.store.select(selectBackTrip);

  private passengers$ = this.store.select(selectPassengers);

  private subThere!: Subscription;

  private subBack!: Subscription;

  private subPassengers!: Subscription;

  private therePrice!: number;

  private backPrice!: number;

  private passengers!: PassengersInfo[];

  private passengerOptions = [
    { type: 'Adult', ratio: ADULT_RATIO, ratioType: ADULT_RATIO_TYPE },
    { type: 'Child', ratio: CHILD_RATIO, ratioType: CHILD_RATIO_TYPE },
    { type: 'Infant', ratio: INFANT_RATIO, ratioType: INFANT_RATIO_TYPE },
  ];

  constructor(
    private store: Store,
    private totalService: TotalService,
    public convertMoneyService: ConvertMoneyService,
  ) { }

  ngOnInit(): void {
    this.subThere = this.there$.subscribe((there) => {
      this.therePrice = there.price;
    });

    this.subBack = this.back$.subscribe((back) => {
      this.backPrice = back.price;
    });

    this.subPassengers = this.passengers$.subscribe((passengers) => {
      this.passengers = passengers;
    });

    this.totalService.setTotalInfo({
      price: this.getTotal,
      passengers: this.typeAmountPassengers,
    });
  }

  ngOnDestroy(): void {
    this.subThere?.unsubscribe();
    this.subBack?.unsubscribe();
    this.subPassengers?.unsubscribe();
  }

  private getPrice(ratioType: number): number {
    return (this.backPrice
      ? this.backPrice + this.therePrice
      : this.therePrice) * ratioType;
  }

  private getPassengersInfo(type: string) {
    const passengers = this.passengers.filter((passenger) => passenger.type === type);

    return {
      amount: passengers.length,
      baggageSummary: this.getBaggage(passengers),
    };
  }

  private getBaggage(passengers: PassengersInfo[]): number {
    return passengers.reduce((start, item) => start + item.baggage.price, 0);
  }

  public get getPrices() {
    return this.passengerOptions.map((option) => {
      const passengerInfo = this.getPassengersInfo(option.type);
      const { amount, baggageSummary } = passengerInfo;
      const price = this.getPrice(option.ratioType);
      const fare = price / (1 + option.ratio);
      return {
        isVisiable: !!amount,
        type: option.type,
        amount,
        price: (price * amount) + baggageSummary,
        fare,
        tax: fare * option.ratio,
        baggageSummary,
      };
    });
  }

  public get getTotal() {
    return this.getPrices.reduce((start, item) => start + item.price, 0);
  }

  private get typeAmountPassengers() {
    return this.getPrices
      .filter((item) => item.amount !== 0)
      .map((item) => `${item.amount} x ${item.type}`);
  }
}
