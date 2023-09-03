import { createReducer, on } from '@ngrx/store';
import * as CountryActions from './country.actions';

export interface CountryState {
  countries: any[]; // Define your state structure
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
    loading: true, // Set loading to true when fetching data
  })),
  on(CountryActions.loadCountriesSuccess, (state, { countries: data }) => ({
    ...state,
    countries: data,
    loading: false, // Set loading to false when data is loaded successfully
  })),
  on(CountryActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false, // Set loading to false in case of an error
  }))
);
