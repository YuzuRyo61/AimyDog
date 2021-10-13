import { Component, Inject, OnInit } from '@angular/core';
import { Federation } from "../../interface/federation";
import { MkApiService } from "../../service/mk-api.service";
import { AuthService } from "../../service/auth.service";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { YnDialogComponent } from "../yn-dialog/yn-dialog.component";

@Component({
  selector: 'app-federation-detail-dialog',
  templateUrl: './federation-detail-dialog.component.html',
  styleUrls: ['./federation-detail-dialog.component.scss']
})
export class FederationDetailDialogComponent implements OnInit {
  data?: Federation;
  loading = false;

  constructor(
    private aus: AuthService,
    private mas: MkApiService,
    private sb: MatSnackBar,
    private md: MatDialog,
    @Inject(MAT_DIALOG_DATA) private host: string,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.loading = true;
    this.mas.fetchFederation(this.host).subscribe(
      res => {
        this.data = res;
      },
      err => {
        console.error(err);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  isAvailableCopy(): boolean {
    return navigator.clipboard !== undefined;
  }

  copyToClipboard(text: string | null): void {
    if (this.data === undefined || text === null) return;

    navigator.clipboard.writeText(text).then(
      () => {
        this.sb.open($localize`:@@common.copy.success:Copied to clipboard`);
      },
      () => {
        this.sb.open($localize`:@@common.copy.failed:Failed copy to clipboard`);
      }
    );
  }

  openUpdateMetaDialog(): void {
    if (this.data === undefined) return;

    const dialog = this.md.open(YnDialogComponent, {
      data: {
        title: $localize`:@@federation.detail.dialog.update_meta.title:Update instance meta`,
        message: $localize`:@@federation.detail.dialog.update_meta.message:Do you want to update the information for this instance?`
      }
    });
    dialog.afterClosed().subscribe(res => {
      if (res === undefined || res !== true || this.data === undefined) return;
      this.mas.updateFederation(this.data.host).subscribe(
        () => {
          this.sb.open($localize`:@@federation.detail.dialog.update_meta.success:Instance meta updated.`);
          this.fetchData();
        },
        err => {
          console.error(err);
          this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
        },
      );
    });
  }

  openRemoveFollowing(): void {
    if (this.data === undefined) return;

    const dialog = this.md.open(YnDialogComponent, {
      data: {
        title: $localize`:@@federation.detail.dialog.remove_following.title:Remove all following`,
        message: $localize`:@@federation.detail.dialog.remove_following.message:Would you like to delete all follow information for users who are following this instance?`
      }
    });
    dialog.afterClosed().subscribe(res => {
      if (res === undefined || res !== true || this.data === undefined) return;
      this.mas.removeAllFollowingFederation(this.data.host).subscribe(
        () => {
          this.sb.open($localize`:@@federation.detail.dialog.remove_following.success:Removed all follow information for the instance.`);
          this.fetchData();
        },
        err => {
          console.error(err);
          this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
        },
      );
    });
  }

  openRemoveDriveData(): void {
    if (this.data === undefined) return;

    const dialog = this.md.open(YnDialogComponent, {
      data: {
        title: $localize`:@@federation.detail.dialog.remove_files.title:Remove all files`,
        message: $localize`:@@federation.detail.dialog.remove_files.message:Do you want to delete all the files posted from this instance?`
      }
    });
    dialog.afterClosed().subscribe(res => {
      if (res === undefined || res !== true || this.data === undefined) return;
      this.mas.removeAllFilesFederation(this.data.host).subscribe(
        () => {
          this.sb.open($localize`:@@federation.detail.dialog.remove_files.success:Removed all files for the instance.`);
          this.fetchData();
        },
        err => {
          console.error(err);
          this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
        },
      );
    });
  }

  isCompatibleEmailValue(): boolean {
    if (this.data === undefined || this.data.maintainerEmail === null) return false;
    const emailRegex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i;
    return emailRegex.test(this.data.maintainerEmail);
  }
}
