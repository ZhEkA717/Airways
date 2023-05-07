import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Trip } from 'src/app/shared/model/trip.model';
import ConvertMoneyService from '../../services/convert-money.service';

@Component({
  selector: 'app-select-trip',
  templateUrl: './select-trip.component.html',
  styleUrls: ['./select-trip.component.scss'],
})
export default class SelectTripComponent implements OnInit {
  @Input() isRound!: boolean;

  @Input() selectTrip: Trip = <Trip>{};

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSelectEvent = new EventEmitter<boolean>();

  public isTrip!: boolean;

  public choiceTrip = true;

  constructor(
    public convertMoneyService: ConvertMoneyService,
  ) {}

  ngOnInit(): void {
    this.isTrip = !!this.selectTrip.flightNo;
  }

  onSelectTrip() {
    this.choiceTrip = !this.choiceTrip;
    this.onSelectEvent.emit(this.choiceTrip);
  }
}
