import { Component, OnInit } from '@angular/core';
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private srv: FireService) { }

  ngOnInit() {

  }

  test() {
    console.log(":click)");
    console.log(this.srv.userName);
  }

}
