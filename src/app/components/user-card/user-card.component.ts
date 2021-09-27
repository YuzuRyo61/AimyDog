import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  constructor(
    private sb: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  isAvailableCopy(): boolean {
    return navigator.clipboard !== undefined;
  }

  copyUserId(): void {
    navigator.clipboard.writeText('userid').then(
      () => {
        this.sb.open('Copied to clipboard', 'Dismiss');
      },
      () => {
        this.sb.open('Failed copy to clipboard', 'Dismiss');
      }
    )
  }

}
