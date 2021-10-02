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

    const rawValue = this.loginAddressForm.value as string;

    let formParse: URL;
    try {
      if (rawValue.match(/^(?!.*(.*\/\/)).+:[0-9]{1,5}$/) !== null) {
        // noinspection ExceptionCaughtLocallyJS
        throw TypeError;
      }
      formParse = new URL(rawValue);
      if(formParse.protocol !== 'http:' && formParse.protocol !== 'https:') {
        this.loginAddressForm.enable();
        this.loginAddressForm.setErrors({ 'invalidProtocol': true });
        return;
      }
      this.aus.protocol = formParse.protocol;
    } catch(_) {
      formParse = new URL(`https://${rawValue}`);
    }
    const address = formParse.host;

    const isAvailable = await this.aus.isAvailableInstance(address);
    if (!isAvailable) {
      this.loginAddressForm.enable();
      this.loginAddressForm.setErrors({ 'fetch': true });
      return;
    }

    this.aus.address = address;
    location.href = this.aus.generateMiAuthUrl(address);
  }
}
