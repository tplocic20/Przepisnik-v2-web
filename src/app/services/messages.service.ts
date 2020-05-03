import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private options = {
    positionClass: "toast-bottom-right",
  };
  constructor() { }

  info(msg: string) {
    // this.toast.info(msg, null, this.options);
  }

  success(msg: string) {
    // this.toast.success(msg, null, this.options);
  }

  warning(msg: string) {
    // this.toast.warning(msg, null, this.options);
  }

  error(msg: string) {
    // this.toast.error(msg, null, this.options);
  }
}
