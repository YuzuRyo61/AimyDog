import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ns: MatSnackBar,
    private aus: AuthService,
  ) { }

  async ngOnInit(): Promise<void> {
    const instance = this.route.snapshot.paramMap.get('instance');

    if (instance === null) {
      await this.onError();
      return;
    }

    const query = this.route.snapshot.queryParamMap.get('session');
    if (query === null) {
      await this.onError();
      return;
    }

    const res = await this.aus.callbackProcess(instance, query);

    if (res === false) {
      await this.onError();
      return;
    } else if (res === undefined) {
      await this.router.navigate(['/dashboard']);
      return;
    }

    this.ns.open('Welcome back!', undefined, {
      duration: 5000,
    });
    await this.router.navigate(['/dashboard']);
  }

  async onError(): Promise<void> {
    this.ns.open('Authentication failed. Please try again.', undefined, {
      duration: 5000,
    });
    await this.router.navigate(['/']);
  }

}
