import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  items: number[] = [];

  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < 100; i++) {
      this.items.push(i);
    }
  }

}
