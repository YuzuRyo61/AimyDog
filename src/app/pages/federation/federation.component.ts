import { Component, OnInit } from '@angular/core';
import { MkApiService } from "../../service/mk-api.service";
import { Federation } from "../../interface/federation";

@Component({
  selector: 'app-federation',
  templateUrl: './federation.component.html',
  styleUrls: ['./federation.component.scss']
})
export class FederationComponent implements OnInit {
  items: Federation[] = [];
  allLoaded = false;

  constructor(
    private mas: MkApiService,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.mas.fetchFederationList(this.items.length, undefined).subscribe(
      res => {
        this.items = this.items.concat(res);
        if (res.length === 0) this.allLoaded = true;
      }
    );
  }

}
