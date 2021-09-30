import { Component } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  loginAddressForm = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private aus: AuthService,
  ) {
  }

  isCookieEnabled(): boolean {
    return navigator.cookieEnabled;
  }

  async submitForm(): Promise<void> {
    this.loginAddressForm.disable();
    const isAvailable = await this.aus.isAvailableInstance(this.loginAddressForm.value as string);
    if (!isAvailable) {
      this.loginAddressForm.enable();
      this.loginAddressForm.setErrors({ 'fetch': true });
      return;
    }

    location.href = this.aus.generateMiAuthUrl(this.loginAddressForm.value as string);
  }
}
