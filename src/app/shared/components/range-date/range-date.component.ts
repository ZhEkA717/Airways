import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { selectDateFormat } from 'src/app/redux/selectors/settings.selector';
import { Observable, Subscription } from 'rxjs';
import RangeDateService from '../../services/range-date.service';

export const MY_FORMAT = {
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
  },
};

@Component({
  selector: 'app-range-date',
  templateUrl: './range-date.component.html',
  styleUrls: ['./range-date.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT },
  ],
})
export default class RangeDateComponent implements OnInit, OnDestroy {
  public dateFormat$!: Observable<string>;

  private subDate!: Subscription;

  constructor(
    public rangeDateService: RangeDateService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.dateFormat$ = this.store.select(selectDateFormat);
    this.subDate = this.dateFormat$.subscribe((formatDate) => {
      MY_FORMAT.display.dateInput = formatDate;
      this.rangeDateService.changeFormat();
    });
  }

  ngOnDestroy(): void {
    this.subDate.unsubscribe();
  }
}
