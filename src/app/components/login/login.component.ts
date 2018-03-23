import { Component, OnInit } from '@angular/core';
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  rememberMe: boolean;
  failedAttempt = false;
  needsToLogIn: boolean = false;
  loginTimeout: any;

  constructor(private srv: FireService) { }

  ngOnInit() {
    this.loginTimeout = setTimeout(() => {
      this.needsToLogIn = true;
    }, 1000);
  }

  login() {
    this.failedAttempt = false;
    this.srv.signIn(this.email, this.password).then(res => {
      console.log(res);
    }, err => {
      this.failedAttempt = true;
    });
  }

}
