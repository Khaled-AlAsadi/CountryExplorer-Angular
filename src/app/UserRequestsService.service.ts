import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRequestsService {
  private apiUrl = 'https://restcountries.com';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/v3.1/all`);
  }

  getCountryByName(CountryName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/v3.1/name/${CountryName}`);
  }
}
