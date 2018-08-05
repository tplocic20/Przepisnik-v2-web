import {Component, OnInit} from '@angular/core';
import {FireService} from "../../services/fire.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {ProfileComponent} from "../modals/profile/profile.component";
import {SettingsComponent} from "../modals/settings/settings.component";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userData: any;
  classes = "rounded-menu";

  constructor(private srv: FireService, private router: Router, private dialogSrv: MatDialog) {
    // this.srv.authCtx.subscribe(user => this.userData = {
    //     name: user.displayName,
    //     email: user.email,
    //     photoUrl: user.photoURL,
    //     emailVerified: user.emailVerified,
    //     uid: user.uid,
    //   }
    // );

    this.userData = this.srv.authState;
  }

  ngOnInit() {
  }

  logout() {
    this.srv.signOut().then(() => this.router.navigate(['home']));
  }

  editProfile() {
    const config = {
      disableClose: true,
      data: this.userData
    };
    this.dialogSrv.open(ProfileComponent, config as any);
  }

  settings() {
    const config = {
      disableClose: true
    };
    this.dialogSrv.open(SettingsComponent, config as any);
  }
}