import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPageInfo } from 'ngx-virtual-scroller';

import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MkApiService} from "../../service/mk-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  items: number[] = [];
  searchOptionsForm = new FormGroup({
    sort: new FormControl('+createdAt', [
      Validators.required,
    ]),
    state: new FormControl('all', [
      Validators.required,
    ]),
  });
  isFailed = false;
  allLoaded = false;

  constructor(
    private sb: MatSnackBar,
    private md: MatDialog,
    private mas: MkApiService,
  ) { }

  ngOnInit(): void {

  }

  vsEvent(event: IPageInfo): void {
    if (event.endIndex === this.items.length - 1 && !this.isFailed && !this.allLoaded) {
      console.log('fetch');
      this.fetchData();
    }
  }

  private fetchData(): void {
    this.mas.fetchUserData().subscribe(
      val => {
        const vna = val as number[];
        this.items = this.items.concat(vna);
        if (vna.length === 0) this.allLoaded = true;
      },
      err => {
        console.error(err);
        this.isFailed = true;
        const errSnack = this.sb.open('Fetch failed.', 'Retry', {
          duration: 0,
        })
        errSnack.onAction().subscribe(() => {
          this.isFailed = false;
          this.fetchData();
        })
      }
    );
  }

  openSearchDialog(): void {
    const dialogRes = this.md.open(SearchDialogComponent, {
      data: this.searchOptionsForm,
      disableClose: true,
    });
    dialogRes.afterClosed().subscribe(result => {
      if (result !== undefined) this.searchOptionsForm = result;
    });
  }
}
