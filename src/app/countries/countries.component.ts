import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectCountries, selectLoading } from '../store/country.selectors';
import * as CountryActions from '../store/country.actions';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent {
  country$: Observable<any[]>;
  public loading$: Observable<boolean> = of(true);
  errorMessage: string = '';
  public currentPage = 1;
  public itemsPerPage = 10;
  totalCountries: number = 0;

  constructor(private store: Store) {
    this.country$ = this.store.select(selectCountries);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(CountryActions.loadCountries());

    this.country$.subscribe(
      (data) => {
        this.totalCountries = data.length;
        this.loading$ = of(false);
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error:', error);
        this.loading$ = of(false);
        this.errorMessage =
          'An error occurred while fetching data. Please try again later.';
      }
    );
  }

  onPageChange(page: PageEvent) {
    this.currentPage = page.pageIndex + 1;
    console.log('Current Page:', this.currentPage);
    window.scrollTo(0, 0);
  }

  getObjectKeys(obj: any): string[] {
    if (obj) {
      return Object.keys(obj);
    }
    return [];
  }

  get startIndex() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex() {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.totalCountries ? this.totalCountries : end;
  }
}
