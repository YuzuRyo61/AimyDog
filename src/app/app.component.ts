import { Component, OnInit } from '@angular/core';
import { NetworkService } from './service/network.service';
import { AuthService } from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private ns: NetworkService,
    public aus: AuthService,
  ) {}

  ngOnInit(): void {
    this.aus.onInit();
    this.ns.status().subscribe(
      status => {
        console.log(status);
      }
    );
  }
}
