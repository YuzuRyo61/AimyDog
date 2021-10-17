import { Component, OnInit } from '@angular/core';
import { MkApiService } from "../../../service/mk-api.service";
import { ServerInfo } from "../../../interface/server-info";

@Component({
  selector: 'app-srv-info-card',
  templateUrl: './srv-info-card.component.html',
  styleUrls: ['./srv-info-card.component.scss']
})
export class SrvInfoCardComponent implements OnInit {
  info?: ServerInfo;

  constructor(
    private mas: MkApiService,
  ) { }

  ngOnInit(): void {
    this.mas.fetchServerInfo().subscribe(
      res => {
        this.info = res;
      },
      err => {
        console.error(err);
      },
    );
  }

}
