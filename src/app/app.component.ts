import {Component, OnInit} from '@angular/core';
import {FireService} from "./services/fire.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private srv: FireService, private router: Router) {
    this.srv.authCtx.subscribe(user => {
      if (user) {
        this.router.navigate(['recipes']);
      }
    });
  }

  get isAuthenticated() {
    return this.srv.isSignedIn;
  }

  ngOnInit(): void {
  }

  logout() {
    this.srv.signOut().then(() => this.router.navigate(['home']));
  }
}
