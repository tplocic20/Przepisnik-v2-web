import { Component, OnInit } from '@angular/core';
import {FireService} from "../../services/fire.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  rememberMe: boolean;
  failedAttempt = false;
  needsToLogIn: boolean = false;
  loginTimeout: any;

  constructor(private srv: FireService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.loginTimeout = setTimeout(() => {
      this.needsToLogIn = true;
    }, 1000);
  }

  login() {
    if (this.loginForm.invalid) {
      if (!this.loginForm.touched) {
        Object.keys(this.loginForm.controls).forEach(field => { // {1}
          const control = this.loginForm.get(field);            // {2}
          control.markAsDirty({ onlySelf: true });       // {3}
        });
      }
      return;
    }
    this.failedAttempt = false;
    const cred = this.loginForm.value;
    this.srv.signIn(cred.email, cred.password).then(res => {
    }, err => {
      this.failedAttempt = true;
    });
  }

}
