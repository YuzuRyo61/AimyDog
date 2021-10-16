import { Component, OnInit } from '@angular/core';
import { NetworkService } from './service/network.service';
import { AuthService } from "./service/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appVer = environment.appVersion;
  appRepository = environment.repositoryUrl;

  constructor(
    private ns: NetworkService,
    public aus: AuthService,
    private sb: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.aus.onInit();
    this.ns.status().subscribe(
      status => {
        if (status) {
          this.aus.onInit();
        } else {
          this.sb.open($localize`:@@common.offline_message:Network is offline. Please check your network connection.`);
        }
      }
    );
  }
}
