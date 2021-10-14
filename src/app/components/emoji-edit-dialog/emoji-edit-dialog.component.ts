import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FederationSearchDialogComponent } from "../../pages/federation/federation-search-dialog/federation-search-dialog.component";
import { Emoji } from "../../interface/emoji";
import { MkApiService } from "../../service/mk-api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { YnDialogComponent } from "../yn-dialog/yn-dialog.component";

@Component({
  selector: 'app-emoji-edit-dialog',
  templateUrl: './emoji-edit-dialog.component.html',
  styleUrls: ['./emoji-edit-dialog.component.scss']
})
export class EmojiEditDialogComponent implements OnInit {
  loading = false;
  aliasesValue = '';

  constructor(
    public ref: MatDialogRef<FederationSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public targetEmoji: Emoji,
    private mas: MkApiService,
    private sb: MatSnackBar,
    private md: MatDialog,
  ) { }

  ngOnInit(): void {
    this.aliasesValue = this.targetEmoji.aliases.join(' ');
  }

  editApply(): void {
    this.loading = true;
    this.targetEmoji.aliases = this.aliasesValue.split(' ');
    this.mas.editEmoji(this.targetEmoji).subscribe(
      () => {
        this.sb.open($localize`:@@emoji.edit_dialog.success:Emoji Updated.`);
        this.loading = false;
        this.ref.close(this.targetEmoji);
      },
      err => {
        console.error(err);
        this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
        this.loading = false;
      }
    );
  }

  deleteEmojiDialog(): void {
    const dialog = this.md.open(YnDialogComponent, {
      data: {
        title: $localize`:@@emoji.edit_dialog.delete.title:Delete emoji`,
        message: $localize`:@@emoji.edit_dialog.delete.message:Do you want to delete this emoji?`
      }
    });
    dialog.afterClosed().subscribe(res => {
      if (res === undefined || res === false) return;
      this.loading = true;
      this.mas.removeEmoji(this.targetEmoji.id).subscribe(
        () => {
          this.sb.open($localize`:@@emoji.edit_dialog.delete.success:Emoji removed.`);
          this.loading = false;
          this.ref.close(null);
        },
        err => {
          console.error(err);
          this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
          this.loading = false;
        },
      );
    });
  }
}
