import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sb: MatSnackBar,
    private aus: AuthService,
  ) { }

  async ngOnInit(): Promise<void> {
    const query = this.route.snapshot.queryParamMap.get('session');
    if (query === null) {
      await this.onError();
      return;
    }

    const res = await this.aus.callbackProcess(query);

    if (res === false) {
      await this.onError();
      return;
    } else if (res === undefined) {
      await this.router.navigate(['/dashboard']);
      return;
    }

    this.sb.open($localize`:@@common.welcome_back:Welcome back!`);
    await this.router.navigate(['/dashboard']);
  }

  async onError(): Promise<void> {
    this.sb.open($localize`:@@common.auth_failed:Authentication failed. Please try again.`);
    await this.router.navigate(['/']);
  }

}
