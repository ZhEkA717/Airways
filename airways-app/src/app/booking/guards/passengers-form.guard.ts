import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSearch } from '@redux/selectors/search.selector';
import { selectBackSeats, selectThereSeats } from '@redux/selectors/flight.selector';
import { MatDialog } from '@angular/material/dialog';
import ConfirmDialogComponent from '@shared/components/confirm-dialog/confirm-dialog.component';
import PassengersComponent from '../pages/passengers/passengers.component';

@Injectable({
  providedIn: 'root',
})
export default class PassengersFormGuard implements CanDeactivate<PassengersComponent> {
  private search$ = this.store.select(selectSearch);

  private thereSeats$ = this.store.select(selectThereSeats);

  private backSeats$ = this.store.select(selectBackSeats);

  private passengersLength!: number;

  private thereSeatsLength!: number;

  private backSeatsLength!: number;

  constructor(
    private store: Store,
    private dialog: MatDialog,
  ) {
    this.search$.subscribe((search) => {
      this.passengersLength = search.passengers
        .reduce((start, item) => item.value + start, 0);
    });

    this.thereSeats$.subscribe((thereSeats) => {
      this.thereSeatsLength = thereSeats.length;
    });

    this.backSeats$.subscribe((backSeats) => {
      this.backSeatsLength = backSeats.length;
    });
  }

  private get isThereSeatsDirty() {
    return (
      this.thereSeatsLength !== this.passengersLength
      && this.thereSeatsLength > 0
    );
  }

  private get isBackSeatsDirty() {
    return (
      this.backSeatsLength === this.passengersLength
      && this.backSeatsLength > 0
    );
  }

  canDeactivate(
    component: PassengersComponent,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (
      (component.form.dirty
        || this.isThereSeatsDirty
        || this.isBackSeatsDirty
      )
      && !component.form.valid
    ) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);
      return dialogRef.afterClosed();
    }
    return of(true);
  }
}
