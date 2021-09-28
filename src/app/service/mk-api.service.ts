import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MkApiService {
  private remain = 10;

  constructor(
    private aus: AuthService,
    private hc: HttpClient,
  ) { }

  fetchUserData(offset: number = 0, untilId?: string): Observable<any> {
    return new Observable(obs => {
      const random = Math.floor(Math.random() * 10);
      if(this.remain <= 0) {
        obs.next([]);
        obs.complete();
      }

      if (random > 1) {
        let ls: number[] = [];
        for (let i = 0; i < 100; i++) {
          ls.push(i);
        }
        this.remain--;
        obs.next(ls);
        obs.complete();
      } else {
        obs.error('random is less than 1');
      }
    })
  }
}
