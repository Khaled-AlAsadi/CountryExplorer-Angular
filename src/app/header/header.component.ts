import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { countryService } from "../services/country.service"; // Import your country service
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  searchControl = new FormControl();
  filteredCountries: any[] = [];

  constructor(private countryService: countryService, private router: Router) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value: string) =>
          this.countryService.getCountryByName(value)
        )
      )
      .subscribe((countries: any[]) => {
        this.filteredCountries = countries;
      });
  }

  displayCountry(country: any): string {
    return country ? country.name : "";
  }
  onCountrySelected(event: any): void {
    const selectedCountryName = event.option.value;
    this.router.navigate(["/country", selectedCountryName]);
  }
}
