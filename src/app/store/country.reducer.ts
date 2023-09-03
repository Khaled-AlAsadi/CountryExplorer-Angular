import { createReducer, on } from '@ngrx/store';
import * as CountryActions from './country.actions';

export interface CountryState {
  countries: any[];
  loading: boolean;
  error: any;
}

export const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

export const countryReducer = createReducer(
  initialState,
  on(CountryActions.loadCountries, (state) => ({
    ...state,
    loading: true,
  })),
  on(CountryActions.loadCountriesSuccess, (state, { countries: data }) => ({
    ...state,
    countries: data,
    loading: false,
  })),
  on(CountryActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
