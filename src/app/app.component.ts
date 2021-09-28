import { Component, OnInit } from '@angular/core';
import { NetworkService } from './service/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private ns: NetworkService,
  ) {}

  ngOnInit(): void {
    this.ns.status().subscribe(
      status => {
        if (!status) {

        } else {

        }
      }
    )
  }
}
