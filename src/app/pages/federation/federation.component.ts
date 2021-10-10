import { Component, OnInit } from '@angular/core';
import { MkApiService } from "../../service/mk-api.service";
import { Federation } from "../../interface/federation";
import { IPageInfo } from "ngx-virtual-scroller";

@Component({
  selector: 'app-federation',
  templateUrl: './federation.component.html',
  styleUrls: ['./federation.component.scss']
})
export class FederationComponent implements OnInit {
  items: Federation[] = [];
  loading = true;
  allLoaded = false;
  private isFailed = false;

  constructor(
    private mas: MkApiService,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.loading = true;
    this.isFailed = false;
    this.mas.fetchFederationList(this.items.length, undefined).subscribe(
      res => {
        this.items = this.items.concat(res);
        if (res.length === 0) this.allLoaded = true;
      },
      err => {
        console.error(err);
        this.isFailed = true;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  vsEvent(event: IPageInfo): void {
    if (this.items.length !== 0 && event.endIndex === this.items.length - 1 && !this.isFailed && !this.allLoaded) {
      this.fetchData();
    }
  }

}
