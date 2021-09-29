import { Component, OnInit } from '@angular/core';
import {IPageInfo} from "ngx-virtual-scroller";
import {DriveFile} from "../../interface/drive-file";
import {MkApiService} from "../../service/mk-api.service";
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  items: DriveFile[] = [];
  isFailed = false;
  allLoaded = false;

  constructor(
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
    const latestId = (this.items.length === 0) ? undefined : this.items.slice(-1)[0].id;
    this.mas.fetchFileList(latestId, undefined).subscribe(
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
      },
    );
  }
}
