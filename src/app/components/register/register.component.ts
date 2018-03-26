import {Component, OnInit} from '@angular/core';
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  password2: string;
  errorMsg: string;

  constructor(private srv: FireService) {
  }

  ngOnInit() {
  }

  register() {
    if (!this.email || !this.password || !this.password2) {
      this.errorMsg = "Nie wszystkie pola zostały uzupełnione";
      return;
    }
    if (this.password !== this.password2) {
      this.errorMsg = "Hasła się od siebie różnią";
      return;
    }
    this.srv.register(this.email, this.password).catch((err) => {
      if (err.code === "auth/email-already-in-use") {
        this.errorMsg = "Istnieje już konto dla tego adresu email";
      }
    });
  }

}
