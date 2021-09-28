import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loginAddressForm = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private aus: AuthService,
  ) { }

  ngOnInit(): void {
  }

  async submitForm(): Promise<void> {
    this.loginAddressForm.disable();
    const isAvailable = await this.aus.isAvailableInstance(this.loginAddressForm.value as string);
    if (!isAvailable) {
      this.loginAddressForm.enable();
      this.loginAddressForm.setErrors({'fetch': true});
      return
    }

    location.href = this.aus.generateMiAuthUrl(this.loginAddressForm.value as string);
  }
}
