import { Component, Input } from '@angular/core';
import { Federation } from "../../interface/federation";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { FederationDetailDialogComponent } from "../federation-detail-dialog/federation-detail-dialog.component";

@Component({
  selector: 'app-federation-card',
  templateUrl: './federation-card.component.html',
  styleUrls: ['./federation-card.component.scss']
})
export class FederationCardComponent {
  @Input() data?: Federation;

  constructor(
    private sb: MatSnackBar,
    private md: MatDialog,
  ) {
  }

  isAvailableCopy(): boolean {
    return navigator.clipboard !== undefined;
  }

  copyHost(): void {
    if (this.data === undefined) return;

    navigator.clipboard.writeText(this.data.host).then(
      () => {
        this.sb.open($localize`:@@common.copy.success:Copied to clipboard`);
      },
      () => {
        this.sb.open($localize`:@@common.copy.failed:Failed copy to clipboard`);
      }
    );
  }

  openDetailDialog(): void {
    if (this.data === undefined) return;
    this.md.open(FederationDetailDialogComponent, {
      data: this.data.host,
    });
  }
}
