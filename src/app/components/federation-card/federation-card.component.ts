import { Component, Input } from '@angular/core';
import { Federation } from "../../interface/federation";

@Component({
  selector: 'app-federation-card',
  templateUrl: './federation-card.component.html',
  styleUrls: ['./federation-card.component.scss']
})
export class FederationCardComponent {
  @Input() data?: Federation;

  // constructor() { }

}
