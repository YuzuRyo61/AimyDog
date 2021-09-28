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
  instance: string | null = null;
  sessionId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ns: MatSnackBar,
    private aus: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.instance = params.get('instance');
    });

    if (this.instance === null) {
      this.onError();
      return;
    }

    const query = new URLSearchParams(window.location.search);
    if (!query.has('session')) {
      this.onError();
      return;
    }

    this.sessionId = query.get('session') as string;

    this.aus.callbackProcess(this.instance, this.sessionId).then(res => {
      if (!res) this.onError();
      this.ns.open('Welcome back!', undefined, {
        duration: 5000,
      });
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/dashboard']);
    }).catch(() => {
      this.onError();
    });

  }

  onError(): void {
    this.ns.open('Authentication failed or you do not have administrator or moderator privileges. Please try again.', undefined, {
      duration: 5000,
    });
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/']);
  }

}
