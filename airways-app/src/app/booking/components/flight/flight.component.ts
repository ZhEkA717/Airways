import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import HeaderService from 'src/app/core/services/header.service';
import HttpApiService from 'src/app/core/services/http-api.service';
import { selectSearch } from 'src/app/redux/selectors/search.selector';
import { Router } from '@angular/router';
import { selectBackChoice, selectThereChoice } from 'src/app/redux/selectors/flight.selector';
import { resetFlight } from 'src/app/redux/actions/flight.action';
import CalendarService from '../../services/calendar.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export default class FlightComponent implements OnInit, OnDestroy {
  public search$ = this.store.select(selectSearch);

  private thereSelect$ = this.store.select(selectThereChoice);

  private backSelect$ = this.store.select(selectBackChoice);

  private subSearch!: Subscription;

  private subThereSelect!: Subscription;

  private subBackSelect!: Subscription;

  private subIsThereSelect!: Subscription;

  private subIsBackSelect!: Subscription;

  private subAvailableThere!: Subscription;

  private subAvailableBack!: Subscription;

  public date = new Date();

  public date1 = new Date();

  public isBackSelect!: boolean;

  public isThereSelect!: boolean;

  public tripWay!: string;

  constructor(
    private headerService: HeaderService,
    private store: Store,
    private httpApiService: HttpApiService,
    private calendarService: CalendarService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.headerService.setStepper({
      flight: true, passengers: false, review: false,
    });

    this.subSearch = this.search$.subscribe((search) => {
      this.store.dispatch(resetFlight());
      this.tripWay = search.tripWay;
      const {
        from, destination,
        startDate, endDate,
      } = search;
      this.date = new Date(startDate);
      this.date1 = new Date(endDate);

      this.subAvailableThere = this.httpApiService.getAvailableTrips(
        from.slice(-3),
        destination.slice(-3),
      ).subscribe((res) => {
        this.calendarService.setDepartDatesThere(res);
      });

      this.subAvailableBack = this.httpApiService.getAvailableTrips(
        destination.slice(-3),
        from.slice(-3),
      ).subscribe((res) => {
        this.calendarService.setDepartDatesBack(res);
      });
    });

    this.calendarService.setBackSelect(true);
    this.calendarService.setThereSelect(true);

    this.subIsThereSelect = this.calendarService.isBackSelect$
      .subscribe((isBackSelect) => {
        this.isBackSelect = isBackSelect;
      });

    this.subIsBackSelect = this.calendarService.isThereSelect$.subscribe((isThereSelect) => {
      this.isThereSelect = isThereSelect;
    });

    this.subThereSelect = this.thereSelect$.subscribe((thereSelect) => {
      this.isThereSelect = thereSelect;
    });

    this.subBackSelect = this.backSelect$.subscribe((backSelect) => {
      this.isBackSelect = backSelect;
    });
  }

  ngOnDestroy(): void {
    this.subSearch?.unsubscribe();
    this.subThereSelect?.unsubscribe();
    this.subBackSelect?.unsubscribe();
    this.subIsThereSelect?.unsubscribe();
    this.subIsBackSelect?.unsubscribe();
    this.subAvailableThere?.unsubscribe();
    this.subAvailableBack?.unsubscribe();
  }

  toMain() {
    this.router.navigate(['main']);
  }

  toPassengers() {
    this.router.navigate(['booking', 'passengers']);
  }

  public get isContinue() {
    if (this.tripWay === 'one') {
      return this.isThereSelect;
    }

    return this.isBackSelect || this.isThereSelect;
  }
}
