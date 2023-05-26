import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import HeaderService from 'src/app/core/services/header.service';
import { saveBackTrip } from 'src/app/redux/actions/flight.action';
import {
  selectBackSeats,
  selectBackTrip,
  selectFeatureFlight,
  selectThereSeats,
  selectThereTrip,
} from 'src/app/redux/selectors/flight.selector';
import { selectFeatureSearch, selectTripWay } from 'src/app/redux/selectors/search.selector';
import { Trip } from 'src/app/shared/model/trip.model';
import { TripWay } from 'src/app/main/model/flight-search.model';
import { updateCart } from 'src/app/redux/actions/cart.action';
import { CartItem } from 'src/app/shared/model/cart.model';
import { selectFeaturePassengerForm } from 'src/app/redux/selectors/passengers.selector';
import { PassengersState, SearchState, TripState } from 'src/app/redux/models/redux-states';
import { CartService } from 'src/app/core/services/cart.service';
import AlertService from 'src/app/shared/services/alert.service';
import HttpApiService from 'src/app/core/services/http-api.service';
import { selectCart, selectCartLoading, selectMaxId } from '../../../redux/selectors/cart.selector';
import { TotalInfo } from '../../models/total-info.model';
import TotalService from '../../services/total.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export default class ReviewComponent implements OnInit, OnDestroy {
  public isOneTripWay = false;

  public isFromAccount = false;

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

  private search$ = this.store.select(selectFeatureSearch);

  private search!: SearchState;

  private subSearch!: Subscription;

  private passengersForm$ = this.store.select(selectFeaturePassengerForm);

  private passengersForm!: PassengersState;

  private subPassengersForm!: Subscription;

  private flight$ = this.store.select(selectFeatureFlight);

  private flight!: TripState;

  private subFlight!: Subscription;

  private cartItems$ = this.store.select(selectCart);

  private thereBookedSeats!: string[];

  private backBookedSeats!: string[];

  private cartItems!: CartItem[];

  private subCartItems!: Subscription;

  public isCartLoading$ = this.store.select(selectCartLoading);

  public isEditNavigate!: Subscription;

  private idCart = 0;

  private editId!: number;

  constructor(
    private headerService: HeaderService,
    private totalService: TotalService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private store: Store,
    private alertService: AlertService,
    private httpApiService: HttpApiService,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.isEditNavigate = params?.['edit'];
      this.editId = params?.['id'];
    });

    this.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });

    this.subSearch = this.search$.subscribe((res) => {
      this.search = res;
    });

    this.subPassengersForm = this.passengersForm$.subscribe((res) => {
      this.passengersForm = res;
    });

    this.subFlight = this.flight$.subscribe((res) => {
      this.flight = res;
    });
  }

  ngOnInit(): void {
    this.headerService.setStepper({
      flight: true, passengers: true, review: true,
    });

    this.subThere = this.thereTrip$.subscribe((there) => {
      this.thereTrip = there;
      this.thereBookedSeats = there.bookedSeats;
    });

    this.subBack = this.backTrip$.subscribe((back) => {
      this.backTrip = back;
      this.backBookedSeats = back.bookedSeats;
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

    this.route.queryParams.subscribe((params) => {
      this.isFromAccount = params?.['fromaccount'];
    });

    this.store.select(selectMaxId).subscribe((val) => {
      this.idCart = val + 1;
    });
  }

  ngOnDestroy(): void {
    this.subThere?.unsubscribe();
    this.subBack?.unsubscribe();
    this.subTotalInfo?.unsubscribe();
    this.subSearch?.unsubscribe();
    this.subPassengersForm?.unsubscribe();
    this.subFlight?.unsubscribe();
    this.subCartItems?.unsubscribe();
  }

  toPassengers() {
    this.isEditNavigate
      ? this.router.navigate(['booking', 'passengers'], {
        queryParams: { editId: this.editId, edit: true },
      })
      : this.router.navigate(['booking', 'passengers']);
  }

  private get cartSubmit() {
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
      id: this.idCart,
      type: this.tripWay === 'round' ? 'Round trip' : 'One way',
      flightNo,
      forward: {
        flight: `${thereFrom.city} - ${thereTo.city}`,
        departDate: thereDepartDate,
        arriveDate: thereArriveDate,
      },
      backward: {
        flight: !this.isOneTripWay ? `${backFrom.city} - ${backTo.city}` : '',
        departDate: !this.isOneTripWay ? backDepartDate : '',
        arriveDate: !this.isOneTripWay ? backArriveDate : '',
      },
      passengers,
      price,
      thereSeats: this.thereSeats,
      backSeats: this.backSeats,
      isPayed: false,
      search: this.search,
      passengersForm: this.passengersForm,
      flight: this.flight,
    };
    return cart;
  }

  public get isExistCart() {
    const empty: string[] = [];
    let isThereSeatsExist = false;
    let isBackSeatsExist = false;
    const {
      thereSeats,
      backSeats,
      forward,
    } = this.cartSubmit;
    const thereCartSeats = empty.concat(...this.cartItems
      .filter((item) => item.forward.flight === forward.flight)
      .map((item) => item.thereSeats) as string[][]) as string[];
    const backCartSeats = empty.concat(...this.cartItems
      .filter((item) => item.forward.flight === forward.flight)
      .map((item) => item.backSeats) as string[][]) as string[];

    for (let i = 0; i < thereSeats?.length; i += 1) {
      if (thereCartSeats.includes(thereSeats[i])) isThereSeatsExist = true;
    }
    for (let i = 0; i < backSeats?.length; i += 1) {
      if (backCartSeats.includes(backSeats[i])) isBackSeatsExist = true;
    }
    return isThereSeatsExist || isBackSeatsExist;
  }

  buyNow() {
    const payedCartItem = { ...this.cartSubmit, isPayed: true };
    if (!this.isExistCart) {
      this.store.dispatch(updateCart({
        cartItems: this.cartService.addToCart(this.cartItems, payedCartItem),
      }));
      this.router.navigate(['/account']);
    } else {
      this.alertService.warning('Please change seats');
    }
  }

  addToCart() {
    if (!this.isExistCart) {
      this.store.dispatch(updateCart({
        cartItems: this.cartService.addToCart(this.cartItems, this.cartSubmit),
      }));
    } else {
      this.alertService.warning('Please change seats');
    }
  }

  editTrip() {
    const editCart = { ...this.cartSubmit, id: +this.editId };
    if (!this.isExistCart) {
      this.store.dispatch(updateCart({
        cartItems: this.cartService.editCartItem(this.cartItems, +this.editId, editCart),
      }));
      this.router.navigate(['/cart']);
    } else {
      this.alertService.warning('Please change seats');
    }
  }
}
