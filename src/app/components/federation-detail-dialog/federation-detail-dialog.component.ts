import { Component, Inject, OnInit } from '@angular/core';
import { Federation } from "../../interface/federation";
import { MkApiService } from "../../service/mk-api.service";
import { AuthService } from "../../service/auth.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

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
}
