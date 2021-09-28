import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPageInfo } from 'ngx-virtual-scroller';

import { SearchDialogComponent } from './search-dialog/search-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  items: number[] = [];

  constructor(
    private md: MatDialog,
  ) { }

  ngOnInit(): void {
    for(let i = 0; i < 100; i++) {
      this.items.push(i);
    }
  }

  vsEvent(event: IPageInfo): void {
    if (event.endIndex === this.items.length - 1) {
      for(let i = 0; i < 100; i++) {
        this.items.push(i);
      }
    }
  }

  openSearchDialog(): void {
    const dialogRes = this.md.open(SearchDialogComponent);
    dialogRes.afterClosed().subscribe(result => {

    });
  }
}
