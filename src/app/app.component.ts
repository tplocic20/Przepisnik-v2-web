import {Component, OnInit} from '@angular/core';
import {FireService} from "./services/fire.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private srv: FireService) {
    this.srv.authCtx.subscribe(user => {
      if (user) {

      }
    });
  }

  ngOnInit(): void {
  }
}
