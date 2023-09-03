import { createAction, props } from '@ngrx/store';

export const loadCountries = createAction('[Country] Load Countries');
export const loadCountriesSuccess = createAction(
  '[Country] Load Countries Success',
  props<{ countries: any[] }>()
);
export const loadCountriesFailure = createAction(
  '[Country] Load Countries Failure',
  props<{ error: any }>()
);

export const getCountryByName = createAction(
  '[Country] Get Country by Name',
  props<{ countryName: string }>()
);
