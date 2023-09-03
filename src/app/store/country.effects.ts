import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserRequestsService } from '../UserRequestsService.service';
import * as CountryActions from './country.actions';

@Injectable()
export class CountryEffects {
  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      switchMap(() => {
        return this.userRequestsService.getCountries().pipe(
          map((data) =>
            CountryActions.loadCountriesSuccess({ countries: data })
          ),
          catchError((error) =>
            of(CountryActions.loadCountriesFailure({ error }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userRequestsService: UserRequestsService
  ) {}
}
