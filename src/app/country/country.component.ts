import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { countryService } from "../services/country.service";
import { routeHistoryService } from "../services/routeHistoryService.service";
import {utilityService} from "../services/utilityService.service"
@Component({
  selector: "app-country",
  templateUrl: "./country.component.html",
  styleUrls: ["./country.component.scss"],
})
export class CountryComponent implements OnInit {
  country: any;
  currentPage!: number;
  constructor(
    private route: ActivatedRoute,
    private countryService: countryService,
    private utilityService: utilityService,
    private routeHistoryService: routeHistoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const countryName = params["countryName"];

      this.countryService.getCountryByName(countryName).subscribe(
        (data) => {
          this.country = data[0];
          this.currentPage = this.route.snapshot.queryParams["page"]
            ? +this.route.snapshot.queryParams["page"]
            : 1;
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    });
  }

  getObjectKeys(obj: any): string[] {
    if (obj) {
      return Object.keys(obj);
    }
    return [];
  }
  goBack(): void {
    this.router.navigate(["/"], { queryParams: { page: this.currentPage } });
  }
}
