// route-history.service.ts
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class routeHistoryService {
  private history: string[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history = [...this.history, event.url];
      }
    });
  }

  getPreviousUrl(): string | null {
    if (this.history.length > 1) {
      return this.history[this.history.length - 2];
    }
    return null;
  }
}
