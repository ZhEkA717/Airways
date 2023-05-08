import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import HeaderService from 'src/app/core/services/header.service';
import { saveBackTrip } from 'src/app/redux/actions/flight.action';
import { selectBackTrip, selectThereTrip } from 'src/app/redux/selectors/flight.selector';
import { selectTripWay } from 'src/app/redux/selectors/search.selector';
import { Trip } from 'src/app/shared/model/trip.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export default class ReviewComponent implements OnInit, OnDestroy {
  public isOneTripWay = false;

  public thereTrip: Trip = <Trip>{};

  public backTrip: Trip = <Trip>{};

  private thereTrip$ = this.store.select(selectThereTrip);

  private backTrip$ = this.store.select(selectBackTrip);

  private tripWay$ = this.store.select(selectTripWay);

  subThere!: Subscription;

  subBack!: Subscription;

  constructor(
    private headerService: HeaderService,
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

    this.tripWay$.subscribe((tripWay) => {
      if (tripWay === 'one') {
        this.isOneTripWay = false;
        this.store.dispatch(saveBackTrip(<Trip>{}));
      } else {
        this.isOneTripWay = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.subThere?.unsubscribe();
    this.subBack?.unsubscribe();
  }

  toPassengers() {
    this.router.navigate(['booking', 'passengers']);
  }
}
