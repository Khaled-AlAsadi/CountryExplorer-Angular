import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCountries } from '../store/country.selectors';
import * as CountryActions from '../store/country.actions';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent {
  country$: Observable<any>;
  @Input() country: any;
  public currentPage = 1;
  public itemsPerPage = 10;
  totalCountries: number = 0;

  constructor(private store: Store) {
    this.country$ = this.store.select(selectCountries);
  }

  ngOnInit() {
    this.country$ = this.store.select(selectCountries);
    this.store.dispatch(CountryActions.loadCountries());

    this.country$.subscribe((data) => {
      console.log('Emitted Data:', data);
      this.totalCountries = data.length;
    });
  }

  nextPage() {
    this.currentPage++;
  }
  onPageChange(page: PageEvent) {
    this.currentPage = page.pageIndex + 1;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  get startIndex() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex() {
    return this.currentPage * this.itemsPerPage;
  }
}
