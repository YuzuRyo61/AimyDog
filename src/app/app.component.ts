import { Component, OnInit } from '@angular/core';
import { NetworkService } from './service/network.service';
import { AuthService } from "./service/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "../environments/environment";
import { YnDialogComponent } from "./components/yn-dialog/yn-dialog.component";
import { SwUpdate } from "@angular/service-worker";
import { MatDialog } from "@angular/material/dialog";

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
    private swUpdate: SwUpdate,
    private md: MatDialog,
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
    this.checkUpdate();
  }

  private checkUpdate(): void {
    if (!this.swUpdate.isEnabled) {
      console.log('Service worker is not enabled.');
      return;
    }
    this.swUpdate.available.subscribe(event => {
      console.log(`New version available: ${event.current.hash} => ${event.available.hash}`);
      const dialog = this.md.open(YnDialogComponent, {
        data: {
          title: $localize`:@@update.available.title:Update available`,
          message: $localize`:@@update.available.message:There is an update for AimyDog. Do you want to update?`,
        },
        disableClose: true,
      });
      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true) return;
        this.swUpdate.activateUpdate().then(() => window.location.reload());
      });
    });
    // noinspection JSIgnoredPromiseFromCall
    this.swUpdate.checkForUpdate();
  }
}
