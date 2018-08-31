import { Injectable } from '@angular/core';
import {ToastService} from "ng-uikit-pro-standard";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private options = {
    positionClass: "toast-bottom-right",
  };
  constructor(private toast: ToastService) { }

  info(msg: string) {
    this.toast.info(msg, null, this.options);
  }

  success(msg: string) {
    this.toast.success(msg, null, this.options);
  }

  warning(msg: string) {
    this.toast.warning(msg, null, this.options);
  }

  error(msg: string) {
    this.toast.error(msg, null, this.options);
  }
}
