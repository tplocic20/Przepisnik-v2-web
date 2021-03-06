import {Component, OnInit} from '@angular/core';
import {FireService} from "./services/fire.service";
import {Router} from "@angular/router";
import {SettingsService} from "./services/settings.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private srv: FireService, private router: Router, public settings: SettingsService) {
    this.srv.authCtx.subscribe(user => {
      if (user) {
        if (user.emailVerified) {
          this.router.navigate(['recipes']);
        } else {
          this.srv.signOut();
        }
      }
    });
  }

  get isAuthenticated() {
    return this.srv.isSignedIn && this.srv.isEmailVerified;
  }

  ngOnInit(): void {
  }
}
