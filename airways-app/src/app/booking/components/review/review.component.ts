import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import HeaderService from 'src/app/core/services/header.service';
import { saveBackTrip } from 'src/app/redux/actions/flight.action';
import {
  selectBackSeats,
  selectBackTrip,
  selectThereSeats,
  selectThereTrip,
} from 'src/app/redux/selectors/flight.selector';
import { selectTripWay } from 'src/app/redux/selectors/search.selector';
import { Trip } from 'src/app/shared/model/trip.model';
import { TripWay } from 'src/app/main/model/flight-search.model';
import { addToCart } from 'src/app/redux/actions/cart.action';
import TotalService from '../../services/total.service';
import { TotalInfo } from '../../models/total-info.model';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export default class ReviewComponent implements OnInit, OnDestroy {
  public isOneTripWay = false;

  public thereTrip: Trip = <Trip>{};

  public backTrip: Trip = <Trip>{};

  public thereSeats: string[] = [];

  public backSeats: string[] = [];

  private thereTrip$ = this.store.select(selectThereTrip);

  private backTrip$ = this.store.select(selectBackTrip);

  private tripWay$ = this.store.select(selectTripWay);

  public thereSeats$ = this.store.select(selectThereSeats);

  public backSeats$ = this.store.select(selectBackSeats);

  private totalInfo: TotalInfo = <TotalInfo>{};

  private tripWay!: TripWay;

  private subTotalInfo!: Subscription;

  subThere!: Subscription;

  subBack!: Subscription;

  constructor(
    private headerService: HeaderService,
    private totalService: TotalService,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.headerService.setStepper({
      flight: true, passengers: true, review: true,
    });

    this.subThere = this.thereTrip$.subscribe((there) => {
      this.thereTrip = there;
    });

    this.subBack = this.backTrip$.subscribe((back) => {
      this.backTrip = back;
    });

    this.thereSeats$.subscribe((there) => {
      this.thereSeats = there;
    });

    this.backSeats$.subscribe((back) => {
      this.backSeats = back;
    });

    this.tripWay$.subscribe((tripWay) => {
      this.tripWay = tripWay;
      if (tripWay === 'one') {
        this.isOneTripWay = true;
        this.store.dispatch(saveBackTrip(<Trip>{}));
      } else {
        this.isOneTripWay = false;
      }
    });

    this.subTotalInfo = this.totalService.totalInfo$
      .subscribe((info) => {
        this.totalInfo = info;
      });
  }

  ngOnDestroy(): void {
    this.subThere?.unsubscribe();
    this.subBack?.unsubscribe();
    this.subTotalInfo?.unsubscribe();
  }

  toPassengers() {
    this.router.navigate(['booking', 'passengers']);
  }

  addToCart() {
    const {
      flightNo,
      from: thereFrom, to: thereTo,
      departDate: thereDepartDate,
      arriveDate: thereArriveDate,
    } = this.thereTrip;

    const {
      from: backFrom, to: backTo,
      departDate: backDepartDate,
      arriveDate: backArriveDate,
    } = this.backTrip;

    const { price, passengers } = this.totalInfo;

    const cart: CartItem = {
      type: this.tripWay,
      flightNo,
      flight: this.isOneTripWay
        ? `${thereFrom.city} - ${thereTo.city}`
        : [
          `${thereFrom.city} - ${thereTo.city}`,
          `${backFrom.city} - ${backTo.city}`,
        ],
      date: this.isOneTripWay
        ? { thereDepartDate, thereArriveDate }
        : [
          { thereDepartDate, thereArriveDate },
          { backDepartDate, backArriveDate },
        ],
      passengers,
      price,
    };
    this.store.dispatch(addToCart({ cart }));
  }
}
