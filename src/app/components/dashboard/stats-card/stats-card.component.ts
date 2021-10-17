import { Component, Input } from '@angular/core';
import { MkStats } from "../../../interface/mk-stats";

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent {
  @Input() stats?: MkStats;
}
