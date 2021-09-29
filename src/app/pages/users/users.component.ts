import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPageInfo } from 'ngx-virtual-scroller';

import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MkApiService} from "../../service/mk-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../interface/user";
import {UserSearchOption} from "../../interface/user-search-option";
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  items: User[] = [];
  searchOptionsForm = new FormGroup({
    sort: new FormControl('+createdAt', [
      Validators.required,
    ]),
    state: new FormControl('all', [
      Validators.required,
    ]),
    origin: new FormControl('local', [
      Validators.required,
    ]),
  });
  isFailed = false;
  allLoaded = false;

  constructor(
    private sb: MatSnackBar,
    private md: MatDialog,
    private mas: MkApiService,
    private ls: LoadingService,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  vsEvent(event: IPageInfo): void {
    if (this.items.length !== 0 && event.endIndex === this.items.length - 1 && !this.isFailed && !this.allLoaded) {
      this.fetchData();
    }
  }

  private fetchData(): void {
    this.ls.loading = true;
    this.mas.fetchUserList(this.items.length, this.searchOptionsForm.value as UserSearchOption).subscribe(
      val => {
        this.items = this.items.concat(val);
        this.ls.loading = false;
        if (val.length === 0) {
          this.allLoaded = true;
          return;
        }
      },
      err => {
        console.error(err);
        this.ls.loading = false;
        this.isFailed = true;
        const errSnack = this.sb.open('Fetch failed.', 'Retry', {
          duration: 0,
        });
        errSnack.onAction().subscribe(() => {
          this.isFailed = false;
          this.fetchData();
        });
      },
    );
  }

  openSearchDialog(): void {
    const dialogRes = this.md.open(SearchDialogComponent, {
      data: this.searchOptionsForm,
      disableClose: true,
    });
    dialogRes.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.searchOptionsForm = result;
        this.items = [];
        this.allLoaded = false;
        this.fetchData();
      }
    });
  }
}
