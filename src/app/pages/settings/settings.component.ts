import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MkApiService } from "../../service/mk-api.service";
import { MatAccordion } from "@angular/material/expansion";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion?: MatAccordion;

  settingsForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(),
    maintainerName: new FormControl(''),
    maintainerEmail: new FormControl('', [Validators.email]),
    tosUrl: new FormControl('', [Validators.pattern(/.+:\/\/.+/)]),
    repositoryUrl: new FormControl('', [Validators.pattern(/.+:\/\/.+/)]),
    feedbackUrl: new FormControl('', [Validators.pattern(/.+:\/\/.+/)]),
  });

  constructor(
    private mas: MkApiService,
  ) { }

  ngOnInit(): void {
    this.mas.fetchMeta().subscribe(
      res => {
        this.settingsForm.setValue({
          name: res.name,
          description: res.description,
          maintainerName: res.maintainerName,
          maintainerEmail: res.maintainerEmail,
          tosUrl: res.tosUrl,
          repositoryUrl: res.repositoryUrl,
          feedbackUrl: res.feedbackUrl,
        });
      },
      err => {
        console.error(err);
      }
    );
  }

  save(): void {
    //
  }
}
