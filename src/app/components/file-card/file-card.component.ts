import {Component, Input, OnInit} from '@angular/core';
import {DriveFile} from "../../interface/drive-file";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnInit {
  @Input() file?: DriveFile;

  constructor(
    private sb: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  isAvailableCopy(): boolean {
    return navigator.clipboard !== undefined;
  }

  copyUserId(): void {
    if (this.file === undefined) return;

    navigator.clipboard.writeText(this.file.id).then(
      () => {
        this.sb.open('Copied to clipboard');
      },
      () => {
        this.sb.open('Failed copy to clipboard');
      }
    )
  }
}
