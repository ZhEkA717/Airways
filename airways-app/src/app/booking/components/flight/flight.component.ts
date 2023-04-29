import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import HeaderService from 'src/app/core/services/header.service';
import HttpApiService from 'src/app/core/services/http-api.service';
import { selectSearch } from 'src/app/redux/selectors/search.selector';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export default class FlightComponent implements OnInit, OnDestroy {
  private search$ = this.store.select(selectSearch);

  private subSearch!: Subscription;

  constructor(
    private headerService: HeaderService,
    private store: Store,
    private httpApiService: HttpApiService,
  ) {}

  ngOnInit(): void {
    this.headerService.setStepper({
      flight: true, passengers: false, review: false,
    });

    this.subSearch = this.search$.subscribe((search) => {
      const { from, destination } = search;
      this.httpApiService.getAvailableTrips(
        from.slice(-3),
        destination.slice(-3),
      )
        .subscribe((res) => {
          // eslint-disable-next-line no-console
          console.log(res);
        });
    });
  }

  ngOnDestroy(): void {
    this.subSearch?.unsubscribe();
  }
}
