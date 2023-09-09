// utility.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class utilityService {
  getObjectKeys(obj: any): string[] {
    if (obj) {
      return Object.keys(obj);
    }
    return [];
  }
}
