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
import CalendarService from '../../services/calendar.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export default class FlightComponent implements OnInit, OnDestroy {
  public search$ = this.store.select(selectSearch);

  private subSearch!: Subscription;

  public date = new Date();

  public date1 = new Date();

  constructor(
    private headerService: HeaderService,
    private store: Store,
    private httpApiService: HttpApiService,
    private calendarService: CalendarService,
  ) {}

  ngOnInit(): void {
    this.headerService.setStepper({
      flight: true, passengers: false, review: false,
    });

    this.subSearch = this.search$.subscribe((search) => {
      const { from, destination, startDate } = search;
      this.date = new Date(startDate);
      this.date1 = new Date(startDate);

      this.httpApiService.getAvailableTrips(
        from.slice(-3),
        destination.slice(-3),
      ).subscribe((res) => {
        this.calendarService.setArriveDates(res);
      });
    });
  }

  ngOnDestroy(): void {
    this.subSearch?.unsubscribe();
  }
}
