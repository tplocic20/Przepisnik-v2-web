import {Component, OnInit} from '@angular/core';
import {FireService} from "../../services/fire.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../../pipes/validators/PasswordValidator";
import {MessagesService} from "../../services/messages.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMsg: string;
  registerForm: FormGroup;

  constructor(private srv: FireService, private fb: FormBuilder, private toast: MessagesService, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: this.fb.group({
        pw: ['', [Validators.required]],
        confirm: ['', Validators.required]
      }, {
        validator: PasswordValidation.MatchPassword
      })
    });
  }

  register() {
    if (this.registerForm.valid) {
      const val = this.registerForm.value;
      this.srv.register(val.email, val.password.pw).then((auth) => {
        auth.user.sendEmailVerification();
        this.toast.info("Zarejestrowano");
        this.router.navigate(['home']);
      }).catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          this.errorMsg = "Istnieje już konto dla tego adresu email";
        }
      });
    }
  }

}
