import { Component, Input } from '@angular/core';
import { Emoji } from "../../interface/emoji";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { EmojiEditDialogComponent } from "../emoji-edit-dialog/emoji-edit-dialog.component";
import * as clone from "clone";

@Component({
  selector: 'app-emoji-card',
  templateUrl: './emoji-card.component.html',
  styleUrls: ['./emoji-card.component.scss']
})
export class EmojiCardComponent {
  @Input() data?: Emoji | null;

  constructor(
    private sb: MatSnackBar,
    private md: MatDialog,
  ) { }

  isAvailableCopy(): boolean {
    return navigator.clipboard !== undefined;
  }

  copyEmojiName(): void {
    if (this.data === undefined || this.data === null) return;

    navigator.clipboard.writeText(this.data.name).then(
      () => {
        this.sb.open($localize`:@@common.copy.success:Copied to clipboard`);
      },
      () => {
        this.sb.open($localize`:@@common.copy.failed:Failed copy to clipboard`);
      }
    );
  }

  openEmojiEditDialog(): void {
    if (this.data === undefined) return;
    const editDialog = this.md.open(EmojiEditDialogComponent, {
      data: clone(this.data),
    });
    editDialog.afterClosed().subscribe(res => {
      if (res === undefined || this.data === undefined) return;
      this.data = res as Emoji;
    });
  }
}
