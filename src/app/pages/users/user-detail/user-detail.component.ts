import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MkApiService} from "../../../service/mk-api.service";
import {User} from "../../../interface/user";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId?: string;
  user?: User;
  isError = false;

  constructor(
    private route: ActivatedRoute,
    private ma: MkApiService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (userId !== null) this.userId = userId;
      this.fetchData();
    });
  }

  fetchData(): void {
    if (this.userId === undefined) {
      this.isError = true;
      return;
    }
    this.isError = false;

    this.ma.fetchUser(this.userId).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error);
        this.isError = true;
      }
    );
  }
}
