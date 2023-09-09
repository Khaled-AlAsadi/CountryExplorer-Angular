import { Component, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { selectCountries, selectLoading } from "../store/country.selectors";
import * as CountryActions from "../store/country.actions";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.scss"],
})
export class CountriesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  country$: Observable<any[]>;
  public loading$: Observable<boolean> = of(true);
  errorMessage: string = "";
  public currentPage = 1;
  public itemsPerPage = 10;
  totalCountries: number = 0;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.country$ = this.store.select(selectCountries);
    this.loading$ = this.store.select(selectLoading);
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params["page"] ? +params["page"] : 1;
    });
  }

  ngOnInit() {
    this.store.dispatch(CountryActions.loadCountries());

    this.country$.subscribe(
      (data) => {
        this.totalCountries = data.length;
        this.loading$ = of(false);
        this.errorMessage = "";

        if (
          this.currentPage > Math.ceil(this.totalCountries / this.itemsPerPage)
        ) {
          this.currentPage = 1;
        }

        if (this.paginator) {
          this.paginator.pageIndex = this.currentPage - 1;
        }
      },
      (error) => {
        console.error("Error:", error);
        this.loading$ = of(false);
        this.errorMessage =
          "An error occurred while fetching data. Please try again later.";
      }
    );
  }

  onPageChange(page: PageEvent) {
    this.currentPage = page.pageIndex + 1;
    console.log("Current Page:", this.currentPage);
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

  goToCountryDetail(countryName: string) {
    this.router.navigate(["/country", countryName], {
      queryParams: { page: this.currentPage },
    });
  }
}
