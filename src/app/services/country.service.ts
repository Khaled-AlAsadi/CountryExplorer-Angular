import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class countryService {
  private baseUrl = 'https://restcountries.com/v3.1/name';

  constructor(private http: HttpClient) {}

  getCountryByName(countryName: string): Observable<any> {
    const url = `${this.baseUrl}/${countryName}`;
    return this.http.get(url);
  }
}
