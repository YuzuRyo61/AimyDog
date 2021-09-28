import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() { }

  status(): Observable<boolean> {
    return new Observable<boolean>((observer => {
      window.addEventListener('online', () => {
        observer.next(true);
      })
      window.addEventListener('offline', () => {
        observer.next(false);
      })
    }))
  }
}
