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
import { selectBackChoise, selectThereChoise } from 'src/app/redux/selectors/flight.selector';
import { Subscription } from 'rxjs';
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

    this.subSelectThere = this.store.select(selectThereChoise)
      .subscribe((theteSelect) => {
        if (!this.isRound) {
          this.choiceTrip = theteSelect;
        }
      });

    this.subSelectBack = this.store.select(selectBackChoise)
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
