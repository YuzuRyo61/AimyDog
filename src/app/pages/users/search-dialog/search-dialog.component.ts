import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {
  constructor(
    public ref: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup,
  ) {
  }

  ngOnInit(): void {

  }

}
