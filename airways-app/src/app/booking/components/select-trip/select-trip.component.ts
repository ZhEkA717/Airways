import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Trip } from 'src/app/shared/model/trip.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectBackChoice, selectThereChoice } from 'src/app/redux/selectors/flight.selector';
import ConvertMoneyService from '../../services/convert-money.service';

@Component({
  selector: 'app-select-trip',
  templateUrl: './select-trip.component.html',
  styleUrls: ['./select-trip.component.scss'],
})
export default class SelectTripComponent implements OnInit, OnDestroy {
  @Input() isRound!: boolean;

  @Input() selectTrip: Trip = <Trip>{};

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSelectEvent = new EventEmitter<boolean>();

  public isTrip!: boolean;

  public choiceTrip = true;

  private subSelectThere!: Subscription;

  private subSelectBack!: Subscription;

  constructor(
    public convertMoneyService: ConvertMoneyService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.isTrip = !!this.selectTrip.flightNo;

    this.subSelectThere = this.store.select(selectThereChoice)
      .subscribe((thereSelect) => {
        if (!this.isRound) {
          this.choiceTrip = thereSelect;
        }
      });

    this.subSelectBack = this.store.select(selectBackChoice)
      .subscribe((backSelect) => {
        if (this.isRound) {
          this.choiceTrip = backSelect;
        }
      });
  }

  ngOnDestroy(): void {
    this.subSelectThere?.unsubscribe();
    this.subSelectBack?.unsubscribe();
  }

  onSelectTrip() {
    this.choiceTrip = !this.choiceTrip;
    this.onSelectEvent.emit(this.choiceTrip);
  }
}
