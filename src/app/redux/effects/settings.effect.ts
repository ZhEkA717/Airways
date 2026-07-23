import { Injectable } from '@angular/core';
import {
  Actions,
  ROOT_EFFECTS_INIT,
  createEffect,
  ofType,
} from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  of,
} from 'rxjs';
import HttpApiService from 'src/app/core/services/http-api.service';
import { getAirportError, getAirportSuccess } from '../actions/settings.action';

@Injectable()
export default class SettingsEffects {
  public getAirports$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    mergeMap(() => this.httpApiService
      .getAirports().pipe(
        map(
          (airports) => getAirportSuccess({ airports }),
        ),
      )),
    catchError(() => of(getAirportError())),
  ));

  constructor(
    private httpApiService: HttpApiService,
    private actions$: Actions,
  ) { }
}
