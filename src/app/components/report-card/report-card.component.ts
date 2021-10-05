import { Component, Input } from '@angular/core';
import { Report } from "../../interface/report";
import { MatDialog } from "@angular/material/dialog";
import { UserDetailDialogComponent } from "../user-detail-dialog/user-detail-dialog.component";
import { AuthService } from "../../service/auth.service";
import { YnDialogComponent } from "../yn-dialog/yn-dialog.component";
import { MkApiService } from "../../service/mk-api.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent {
  @Input() data?: Report;

  constructor(
    private md: MatDialog,
    private ma: MkApiService,
    private sb: MatSnackBar,
    public aus: AuthService,
  ) { }

  openUserDialog(id: string): void {
    this.md.open(UserDetailDialogComponent, {
      data: id,
    });
  }

  openMarkAsResolvedDialog(): void {
    if (this.data === undefined) return;
    const dialog = this.md.open(YnDialogComponent, {
      data: {
        title: $localize`:@@report.mar_dialog.title:Mark as resolved`,
        message: $localize`:@@report.mar_dialog.message:Are you sure mark as resolved this report?`,
      }
    });
    dialog.afterClosed().subscribe(val => {
      if (val === undefined || val !== true || this.data === undefined) return;
      this.ma.markAsResolvedReport(this.data.id).subscribe(
        () => {
          if (this.data === undefined || this.aus.credentials === undefined) return;
          this.data.resolved = true;
          this.data.assignee = this.aus.credentials;
          this.sb.open($localize`:@@report.mar_dialog.success:Report was mark as resolved.`);
        },
        err => {
          console.error(err);
          this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
        }
      );
    });
  }
}
